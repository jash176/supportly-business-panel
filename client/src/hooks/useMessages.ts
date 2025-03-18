import { useQuery } from "@tanstack/react-query";
import { MessageRequest, messagesApi } from "@/lib/api/messages";

export const messageKeys = {
  all: ["messages"] as const,
  chat: (data: MessageRequest) => [...messageKeys.all, data.sessionId] as const,
};

export function useMessages(data: MessageRequest) {
  return useQuery({
    queryKey: messageKeys.chat(data),
    queryFn: () => messagesApi.getChatMessages(data),
    enabled: !!data.sessionId, // Only run query if sessionId exists
    refetchInterval: 5000, // Poll every 5 seconds for new messages
  });
}
