"use client";
import { useEffect, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { ChatRoom, ChatMessage } from "@/types/chat";
import { getChatRooms, getChatMessages } from "@/lib/api/chat.api";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000";

export const useChat = (activeRoomId?: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoadingRooms, setIsLoadingRooms] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  /* -------------------- SOCKET INIT -------------------- */
  useEffect((): any => {
    const token = localStorage.getItem("accessToken");
    if (!token) return undefined;
    setToken(token);

    const s = io(SOCKET_URL, {
      auth: { token },
      transports: ["websocket"],
    });

    s.on("connect", () => {
      console.log("Socket connected:", s.id);
      setIsConnected(true);
    });

    s.on("disconnect", () => {
      setIsConnected(false);
    });

    s.on("connect_error", (err) => {
      console.error("Socket error:", err.message);
    });

    s.on("message:error", (err) => {
      console.error("Message error:", err);
    });

    setSocket(s);
    return () => s.disconnect();
  }, []);

  /* -------------------- ROOMS -------------------- */
  const fetchRooms = useCallback(async () => {
    setIsLoadingRooms(true);
    try {
      const data = await getChatRooms({ accessToken: token });
      console.log("Fetched chat rooms:", data);
      setRooms(data);

      if (socket && data.length) {
        socket.emit("rooms:join", {
          roomIds: data.map((r) => r.roomId),
        });
      }
    } finally {
      setIsLoadingRooms(false);
    }
  }, [socket, token]);

  useEffect(() => {
    if (isConnected) fetchRooms();
  }, [isConnected, fetchRooms]);

  /* -------------------- MESSAGES (HISTORY) -------------------- */
  useEffect(() => {
    if (!activeRoomId) {
      setMessages([]);
      return;
    }

    const load = async () => {
      setIsLoadingMessages(true);
      try {
        const res = await getChatMessages(activeRoomId);
        setMessages(res.messages);
      } finally {
        setIsLoadingMessages(false);
      }
    };

    load();
  }, [activeRoomId]);

  /* -------------------- REALTIME EVENTS -------------------- */
  useEffect(() => {
    if (!socket) return;

    const onMessage = (msg: ChatMessage) => {
      if (msg.roomId !== activeRoomId) return;

      setMessages((prev) =>
        prev.find((m) => m._id === msg._id) ? prev : [...prev, msg]
      );
    };

    socket.on("message:received", onMessage);
    return () => {
      socket.off("message:received", onMessage);
    };
  }, [socket, activeRoomId]);

  /* -------------------- SEND MESSAGE (SOCKET) -------------------- */
  const sendMessage = (
    content: string,
    type: "text" | "image" | "file" = "text",
    fileData?: {
      fileUrl: string;
      fileName: string;
      fileSize: number;
      mimeType: string;
    }
  ) => {
    if (!socket || !activeRoomId) return;

    socket.emit("message:send", {
      roomId: activeRoomId,
      messageType: type,
      content,
      fileData,
    });
  };

  /* -------------------- TYPING -------------------- */
  const startTyping = () => {
    if (socket && activeRoomId) {
      socket.emit("typing:start", { roomId: activeRoomId });
    }
  };

  const stopTyping = () => {
    if (socket && activeRoomId) {
      socket.emit("typing:stop", { roomId: activeRoomId });
    }
  };

  /* -------------------- READ RECEIPTS -------------------- */
  const markAsRead = () => {
    if (socket && activeRoomId) {
      socket.emit("messages:mark-read", { roomId: activeRoomId });
    }
  };

  return {
    socket,
    rooms,
    messages,
    isConnected,
    isLoadingRooms,
    isLoadingMessages,
    sendMessage,
    startTyping,
    stopTyping,
    markAsRead,
    refreshRooms: fetchRooms,
  };
};
