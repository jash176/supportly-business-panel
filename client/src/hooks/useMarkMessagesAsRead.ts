import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Message, messagesApi } from "@/lib/api/messages";

export const useMarkMessagesAsRead = (sessionId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: messagesApi.markAsRead,
    onSuccess: () => {
      console.log("Marked messages as read", sessionId);
      // Update messages cache to mark messages as read
      queryClient.setQueryData<{ data: Message[] }>(
        [`/messages-service/fetch-message-email/${sessionId}`],
        (old) => {
          if (!old) return { data: [] };
          return {
            data: old.data.map((message) => ({
              ...message,
              isRead: true,
            })),
          };
        }
      );

      // Update chat unread count
      queryClient.setQueryData<{ data: any[] }>(["chats"], (old) => {
        if (!old?.data) return { data: [] };

        // Create a new array reference to ensure React Query detects the change
        const updatedData = old.data.map((chat) =>
          chat.sessionId == sessionId ? { ...chat, unreadMessages: 0 } : chat
        );
        console.log("Marked messages as read", updatedData);
        // // Force a cache invalidation to trigger a re-render
        // setTimeout(() => {
        //   queryClient.invalidateQueries({ queryKey: ['chats'] });
        // }, 0);

        return {
          data: updatedData,
        };
      });
    },
  });
};
