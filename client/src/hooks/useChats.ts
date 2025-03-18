import { useQuery } from "@tanstack/react-query";
import { Chat, inboxApi, InboxResponse } from "@/lib/api/inbox";
import { ApiResponse, ApiError } from "@/lib/api/types";

export const chatKeys = {
  all: ["chats"] as const,
  lists: () => [...chatKeys.all, "list"] as const,
  list: (filters: string) => [...chatKeys.lists(), { filters }] as const,
  details: (id: string) => [...chatKeys.all, "detail", id] as const,
};

export function useChats() {
  return useQuery<InboxResponse, ApiError>({
    queryKey: ["chats"],
    queryFn: async () => {
      try {
        const response: InboxResponse = await inboxApi.getChats();
        return response;
      } catch (error) {
        if (error instanceof Response) {
          const errorData = await error.json();
          throw errorData;
        }
        throw error;
      }
    },
  });
}
