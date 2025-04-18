import { useEffect, useState } from "react";
import ChatsPanel from "@/components/pages/inbox/ChatsPanel";
import ChatPanel from "@/components/pages/inbox/ChatPanel";
import DetailsPanel from "@/components/pages/inbox/DetailsPanel";
import MobileAppDownload from "@/components/MobileAppDownload";
import { useIsMobile } from "@/hooks/use-mobile";
import { useChats } from "@/hooks/useChats";
import { Loader2 } from "lucide-react";
import { ApiError } from "@/lib/api/types";
import { useQueryClient } from "@tanstack/react-query";
import { Message } from "@/lib/api/messages";
import { useSocket } from "@/hooks/useSocket";
import { useMarkMessagesAsRead } from "@/hooks/useMarkMessagesAsRead";
import { Chat } from "@/lib/api/inbox";
import { useWorkspaceInformation } from "@/hooks/useWorkspaceInformation";
import { useWorkspace } from "@/context/WorkspaceContext";

const Inbox: React.FC = () => {
  const queryClient = useQueryClient();
  const socket = useSocket();
  const { setWorkspaceData } = useWorkspace();
  const { data: workspaceInfo, isLoading: isWorkspaceInfoLoading } =
    useWorkspaceInformation();
  const { data: inbox, isLoading, error } = useChats();
  const [activeChat, setActiveChat] = useState(
    inbox && inbox.data ? inbox.data[0] : null
  );
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();
  const { mutate: markAsRead } = useMarkMessagesAsRead(
    activeChat?.sessionId.toString() ?? ""
  );

  useEffect(() => {
    document.title = "Inbox | Supportly";

    // Set workspace data if available
    if (workspaceInfo && workspaceInfo.data) {
      setWorkspaceData(workspaceInfo.data);
    }

    // Listen for new messages
    socket.on("receiveMessage", (message: Message) => {
      // Update messages for the specific chat
      queryClient.setQueryData<{ data: Message[] }>(
        [`/messages-service/fetch-message-email/${message.sessionId}`],
        (old) => {
          if (!old) return { data: [message] };
          return {
            data: [...old.data, message],
          };
        }
      );

      // Update chat list to show latest message
      queryClient.setQueryData<{ data: any[] }>(["chats"], (old) => {
        if (!old?.data) return { data: [] };

        let chatFound = false;

        // Create a **new array reference** for React Query to detect changes
        const updatedChats = old.data.map((chat) => {
          if (chat.sessionId === message.sessionId) {
            chatFound = true;
            // Check if this is the active chat
            const isActiveChat = activeChat?.sessionId === chat.sessionId;

            // If it's not the active chat and the message is from customer, increment unread count
            const shouldIncrementUnread =
              !isActiveChat && message.sender === "customer";

            return {
              ...chat,
              lastMessage: message.content, // Update lastMessage
              lastMessageTime: new Date().toISOString(), // Ensure lastMessageTime updates
              unreadMessages: shouldIncrementUnread
                ? (chat.unreadMessages || 0) + 1
                : chat.unreadMessages || 0,
            };
          }
          return chat;
        });

        // If chat doesn't exist, add it
        if (!chatFound) {
          updatedChats.push({
            sessionId: message.sessionId,
            lastMessage: message.content,
            lastMessageTime: new Date().toISOString(),
            // If new chat and message is from customer, set unread count to 1
            unreadMessages: message.sender === "customer" ? 1 : 0,
          });
        }

        // Sort chats based on `lastMessageTime`
        updatedChats.sort(
          (a, b) =>
            new Date(b.lastMessageTime).getTime() -
            new Date(a.lastMessageTime).getTime()
        );

        return { data: [...updatedChats] }; // New reference to trigger re-render
      });
    });

    // Cleanup on unmount
    return () => {
      socket.off("receiveMessage");
    };
  }, [queryClient, workspaceInfo, setWorkspaceData]);
  useEffect(() => {
    if (!activeChat) document.title = "Inbox | Supportly";
    else
      document.title = `${activeChat?.name} | Supportly` || "Inbox | Supportly"; // Set the title to the chat title or a default value if no chat is selected
  }, [activeChat]);

  const togglePanel = () => {
    setIsVisible(!isVisible);
  };

  const handleChatSelect = (chat: Chat) => {
    console.log("Chat selected:", chat); // Add this log t
    setActiveChat(chat);

    // Get unread messages for this chat
    const messages = queryClient.getQueryData<{ data: Message[] }>([
      `/messages-service/fetch-message-email/${chat.sessionId}`,
    ]);
    if (messages?.data) {
      const unreadMessageIds = messages.data
        .filter((msg) => !msg.isRead)
        .map((msg) => msg.id)
        .join(",");

      if (unreadMessageIds) {
        markAsRead(unreadMessageIds);
      }
    }
  };

  if (isMobile && location.pathname !== "/settings") {
    return <MobileAppDownload />;
  }

  if (isLoading || isWorkspaceInfoLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !inbox) {
    const errorMessage = (error as ApiError)?.message || "Failed to load chats";

    return (
      <div className="flex h-full items-center justify-center flex-col gap-2">
        <p className="text-destructive text-lg">Error loading chats</p>
        <p className="text-sm text-muted-foreground">{errorMessage}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col md:flex-row overflow-hidden h-full">
      <ChatsPanel
        chats={inbox.data || []}
        activeChat={activeChat}
        onChatSelect={handleChatSelect}
      />
      {activeChat && (
        <ChatPanel activeChat={activeChat} onUserDetailsClick={togglePanel} />
      )}
      {activeChat && (
        <DetailsPanel
          activeChat={activeChat}
          isVisible={isVisible}
          togglePanel={togglePanel}
        />
      )}
    </div>
  );
};

export default Inbox;
