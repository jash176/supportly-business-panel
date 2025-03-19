import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Message, MessageRequest, messagesApi } from "@/lib/api/messages";

export const messageKeys = {
  all: ["messages"] as const,
  chat: (data: MessageRequest) => [...messageKeys.all, data.sessionId] as const,
};

export function useMessages({ sessionId }: { sessionId: string }) {
  const queryClient = useQueryClient();

  return {
    ...useQuery<{ data: Message[] }>({
      queryKey: [`/api/messages/${sessionId}`],
      enabled: !!sessionId,
    }),
    queryClient,
  };
}
