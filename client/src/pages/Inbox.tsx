import { useState } from "react";
import ChatsPanel from "@/components/pages/inbox/ChatsPanel";
import ChatPanel from "@/components/pages/inbox/ChatPanel";
import DetailsPanel from "@/components/pages/inbox/DetailsPanel";
import MobileAppDownload from "@/components/MobileAppDownload";
import { useIsMobile } from "@/hooks/use-mobile";
import { useChats } from "@/hooks/useChats";
import { Loader2 } from "lucide-react";
import { ApiError } from "@/lib/api/types";

const Inbox: React.FC = () => {
  const { data: inbox, isLoading, error } = useChats();
  const [activeChat, setActiveChat] = useState(
    inbox && inbox.data ? inbox.data[0] : null
  );
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  const togglePanel = () => {
    setIsVisible(!isVisible);
  };

  if (isMobile && location.pathname !== "/settings") {
    return <MobileAppDownload />;
  }

  if (isLoading) {
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
        onChatSelect={setActiveChat}
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
