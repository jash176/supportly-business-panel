import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Message, messagesApi } from "@/lib/api/messages";

export const useSendMessage = (sessionId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: messagesApi.sendMessage,
    onMutate: async (formData) => {
      // Cancel outgoing fetches
      await queryClient.cancelQueries({ queryKey: [`/messages-service/fetch-message-email/${sessionId}`] });

      // Get current messages
      const previousMessages = queryClient.getQueryData<{ data: Message[] }>([
        `/messages-service/fetch-message-email/${sessionId}`,
      ]);

      // Create optimistic message
      const optimisticMessage: Message = {
        id: Date.now().valueOf(),
        content: formData.get("content") as string || "",
        contentType: formData.get("contentType") as "text" | "image" | "audio",
        sender: "business",
        timestamp: new Date().toISOString(),
        status: "sending",
        businessId: parseInt(formData.get("businessId") as string || ""),
        isRead: false,
        sessionId: parseInt(formData.get("sessionId") as string || ""),
        createdAt: Date.now().toLocaleString(),
        updatedAt: Date.now().toLocaleString(),
        customerEmail: "",
        senderId: ""
      };

      // Update messages with optimistic value
      queryClient.setQueryData<{ data: Message[] }>(
        [`/messages-service/fetch-message-email/${sessionId}`],
        (old) => ({
          data: [...(old?.data || []), optimisticMessage],
        })
      );

      return { previousMessages };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousMessages) {
        queryClient.setQueryData(
          [`/messages-service/fetch-message-email/${sessionId}`],
          context.previousMessages
        );
      }
    },
    onSettled: () => {
      // Refetch after error or success
      queryClient.invalidateQueries({ queryKey: [`/messages-service/fetch-message-email/${sessionId}`] });
    },
  });
};