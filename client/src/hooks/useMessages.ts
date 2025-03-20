import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MessageRequest, messagesApi } from "@/lib/api/messages";

export const messageKeys = {
  all: ["messages"] as const,
  chat: (data: MessageRequest) => [...messageKeys.all, data.sessionId] as const,
};

export function useMessages(body: MessageRequest) {
  const queryClient = useQueryClient();
  const data = {
    sessionId: body.sid ?? ""
  }
  return {
    ...useQuery({
      queryKey: [`/messages-service/fetch-message-email/${body.sessionId}`],
      queryFn: () => messagesApi.getChatMessages(data),
      enabled: !!data.sessionId, // Only run query if sessionId exists
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false, 
    }),
    queryClient,
  }
}
