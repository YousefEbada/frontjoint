import api from "@/lib/api/axios";
import { ChatRoom, ChatMessage, CreateRoomRequest, SendMessageRequest } from "@/types/chat";

interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data: T;
    error?: string;
}

export const getChatRooms = async (data: any): Promise<ChatRoom[]> => {
    console.log("getChatRooms called");
    const response = await api.get<ApiResponse<ChatRoom[]>>('/chat/rooms', {
        headers: {
          Authorization: `Bearer ${data.accessToken}`, // Auth Header
        },
      });
    console.log("getChatRooms response:", response);
    return response.data.data;
};

export const getChatRoom = async (roomId: string): Promise<ChatRoom> => {
    const response = await api.get<ApiResponse<ChatRoom>>(`/chat/rooms/${roomId}`);
    return response.data.data;
};

export const createChatRoom = async (data: CreateRoomRequest): Promise<ChatRoom> => {
    console.log("createChatRoom called with data:", data);
       const response = await api.post<ApiResponse<ChatRoom>>(
      '/chat/rooms', 
      { patientId: data.patientId, doctorNixpendId: data.doctorId, metadata: data.metadata }, // Request Body
      {
        headers: {
          Authorization: `Bearer ${data.accessToken}`, // Auth Header
        },
      }
    );
    console.log("createChatRoom response:");
    return response.data.data;
};

export const getChatMessages = async (roomId: string): Promise<{ messages: ChatMessage[], totalCount: number, hasMore: boolean }> => {
    const response = await api.get<ApiResponse<{ messages: ChatMessage[], totalCount: number, hasMore: boolean }>>(`/chat/rooms/${roomId}/messages`);
    return response.data.data;
};

export const sendChatMessage = async (data: SendMessageRequest): Promise<ChatMessage> => {
    const response = await api.post<ApiResponse<ChatMessage>>('/chat/messages', data);
    return response.data.data;
};

export const markChatMessagesAsRead = async (roomId: string): Promise<void> => {
    await api.put<ApiResponse<null>>(`/chat/rooms/${roomId}/read`);
};
