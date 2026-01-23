"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { ChatRoom, ChatMessage, SendMessageRequest } from "@/types/chat";
import {
  getChatRooms,
  getChatMessages,
  sendChatMessage,
  createChatRoom,
} from "@/lib/api/chat.api";

const SOCKET_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4000";

export const useChat = (activeRoomId?: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoadingRooms, setIsLoadingRooms] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  // Initialize Socket
  useEffect(() => {
    const token =
      localStorage.getItem("accessToken") || localStorage.getItem("token");
    if (!token) {
      console.warn("useChat: No token found");
      return;
    }

    const newSocket = io(SOCKET_URL, {
      auth: { token },
      transports: ["websocket", "polling"], // fallback
    });

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
      setIsConnected(true);
    });

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected");
      setIsConnected(false);
    });

    newSocket.on("error", (err: any) => {
      console.error("Socket error:", err);
    });

    newSocket.on("connect_error", (err: any) => {
      console.error("Socket connection error:", err.message);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Fetch Rooms on Mount or Socket Connect
  const fetchRooms = useCallback(async () => {
    setIsLoadingRooms(true);
    try {
      const data = await getChatRooms();
      setRooms(data);

      // Join all rooms in socket
      if (socket && data.length > 0) {
        const roomIds = data.map((r) => r.roomId);
        socket.emit("rooms:join", { roomIds });
      }
    } catch (error) {
      console.error("Failed to fetch rooms:", error);
    } finally {
      setIsLoadingRooms(false);
    }
  }, [socket]);

  useEffect(() => {
    if (isConnected) {
      fetchRooms();
    }
  }, [isConnected, fetchRooms]);

  // Fetch Messages when activeRoomId changes
  useEffect(() => {
    if (!activeRoomId) {
      setMessages([]);
      return;
    }

    const loadMessages = async () => {
      setIsLoadingMessages(true);
      try {
        // Fetch first page
        const res = await getChatMessages(activeRoomId);
        // Messages usually come newest-first or oldest-first?
        // Typically chat UIs want oldest-first (render top down) or newest-first (render bottom up).
        // Let's assume standard API sort (usually newest first for pagination, so we reverse for display).
        // We'll verify sorting later. For now, we set them.
        setMessages(res.messages.reverse());
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      } finally {
        setIsLoadingMessages(false);
      }
    };

    loadMessages();
  }, [activeRoomId]);

  // Listen for new messages
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (msg: ChatMessage) => {
      console.log("New message received:", msg);
      // Append if it belongs to current room
      if (activeRoomId && msg.roomId === activeRoomId) {
        setMessages((prev) => [...prev, msg]);
      }
      // Also update lastMessage in rooms list?
      // (Optional enhancement)
    };

    socket.on("message:received", handleNewMessage);

    return () => {
      socket.off("message:received", handleNewMessage);
    };
  }, [socket, activeRoomId]);

  // Send Message Wrapper
  const sendMessage = async (
    content: string,
    type: "text" | "image" | "file" = "text",
    fileUrl?: string
  ) => {
    if (!activeRoomId) return;

    try {
      // Optimistic update? Or wait for response?
      // "API returns the message object".
      const result = await sendChatMessage({
        roomId: activeRoomId,
        messageType: type,
        content,
        fileUrl,
      });
      // We append immediately?
      // If the socket also emits 'message:received' for the sender, we might get duplicate.
      // Usually sender gets response, others get socket event.
      // OR server broadcasts to everyone including sender.
      // Safest: Append result from API. If socket event comes with same ID, dedupe logic (or rely on React key).

      // Let's assume server broadcasts to ALL in room. So we might NOT need to append manually if socket is fast.
      // But for responsiveness, append manually.

      setMessages((prev) => {
        // simple dedupe check by ID
        if (prev.find((m) => m._id === result._id)) return prev;
        return [...prev, result];
      });

      return result;
    } catch (error) {
      console.error("Failed to send message:", error);
      throw error;
    }
  };

  const joinRoom = (roomIds: string[]) => {
    if (socket) {
      socket.emit("rooms:join", { roomIds });
    }
  };

  return {
    socket,
    isConnected,
    rooms,
    messages,
    isLoadingRooms,
    isLoadingMessages,
    sendMessage,
    refreshRooms: fetchRooms,
    joinRoom,
  };
};
