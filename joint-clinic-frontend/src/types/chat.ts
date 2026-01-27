export interface ChatRoom {
  _id: string;
  patientId: string;
  doctorId: string;
  roomId: string;
  status: "active" | "archived";
  createdAt: string;
  updatedAt: string;
  lastMessageAt?: string;
  metadata?: {
    patientName?: string;
    doctorName?: string;
    bookingId?: string;
  };
}

export interface ChatMessage {
  _id: string;
  roomId: string; // The UUID roomId
  senderId: string;
  senderType: "patient" | "doctor" | "system";
  messageType: "text" | "image" | "file" | "system";
  content: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  mimeType?: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  metadata?: {
    replyTo?: string;
    edited?: boolean;
    editedAt?: string;
  };
}

export interface CreateRoomRequest {
  patientId: string;
  doctorId: string;
  accessToken: string;
  metadata?: {
    patientName?: string;
    doctorName?: string;
    bookingId?: string;
  };
}

export interface SendMessageRequest {
  roomId: string;
  messageType: "text" | "image" | "file";
  content: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  mimeType?: string;
  metadata?: {
    replyTo?: string;
  };
}
