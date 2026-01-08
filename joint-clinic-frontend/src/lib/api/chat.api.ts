import api from "./axios";
import {
  ChatRoom,
  ChatMessage,
  CreateRoomRequest,
  SendMessageRequest,
} from "@/types/chat";

export const getChatRooms = async (): Promise<ChatRoom[]> => {
  const response = await api.get("/chat/rooms");
  return response.data.data;
};

export const createChatRoom = async (
  data: CreateRoomRequest
): Promise<ChatRoom> => {
  const response = await api.post("/chat/rooms", data);
  return response.data.data;
};

export const getChatMessages = async (
  roomId: string,
  page = 1,
  limit = 50
): Promise<{
  messages: ChatMessage[];
  totalCount: number;
  hasMore: boolean;
}> => {
  const response = await api.get(`/chat/rooms/${roomId}/messages`, {
    params: { page, limit },
  });
  return response.data.data;
};

export const sendChatMessage = async (
  data: SendMessageRequest
): Promise<ChatMessage> => {
  const response = await api.post("/chat/messages", data);
  return response.data.data;
};

export const markMessagesAsRead = async (
  roomId: string
): Promise<{ count: number }> => {
  const response = await api.post(`/chat/rooms/${roomId}/mark-read`);
  return response.data.data;
};
