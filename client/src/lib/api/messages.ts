import { apiRequest } from "../queryClient";

export interface MessageRequest {
  sessionId: string;
}

export interface Message {
  id: number;
  businessId: number;
  customerEmail: any;
  sessionId: number;
  sender: string;
  senderId: any;
  contentType: "text" | "image" | "audio" | "email_prompt";
  content: string;
  timestamp: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MessagesResponse {
  success: boolean;
  status: number;
  data: Message[];
  message: string;
}

export const messagesApi = {
  getChatMessages: async (data: MessageRequest): Promise<MessagesResponse> => {
    const response = await apiRequest(
      "POST",
      `/messages-service/fetch-message-email`,
      data
    );
    return response.json();
  },
};
