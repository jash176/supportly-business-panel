import { apiRequest } from "../queryClient";

export interface InboxResponse {
  data: Chat[];
}

export interface Chat {
  sessionId: number;
  sid: string;
  name: string;
  customerEmail: any;
  isResolved: boolean;
  lastMessage: string;
  lastMessageType: string;
  lastMessageTime: string;
  totalMessages: number;
  unreadMessages: number;
  metadata: SessionMetadata;
}

export const inboxApi = {
  getChats: async (): Promise<InboxResponse> => {
    const response = await apiRequest("GET", "/messages-service/fetch-inbox");
    return response.json();
  },
};
