import { messagesApi } from "@/lib/api/messages";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSendMessage = () => {
  return useMutation({
    mutationFn: messagesApi.sendMessage,
  });
};