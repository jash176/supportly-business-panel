import { useState } from 'react';
import ChatsPanel from '@/components/pages/inbox/ChatsPanel';
import ChatPanel from '@/components/pages/inbox/ChatPanel';
import DetailsPanel from '@/components/pages/inbox/DetailsPanel';
import MobileAppDownload from '@/components/MobileAppDownload';
import { useIsMobile } from '@/hooks/use-mobile';
import { chats } from '@/data/mockData';

const Inbox: React.FC = () => {
  const [activeChat, setActiveChat] = useState(chats[0]);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  // Toggle panel visibility on mobile
  const togglePanel = () => {
    setIsVisible(!isVisible);
  };
  
  if (isMobile && location.pathname !== '/settings') {
    return <MobileAppDownload />;
  }
  
  return (
    <div className="flex flex-1 flex-col md:flex-row overflow-hidden h-full">
      <ChatsPanel 
        chats={chats}
        activeChat={activeChat}
        onChatSelect={setActiveChat}
      />
      <ChatPanel activeChat={activeChat} onUserDetailsClick={togglePanel} />
      <DetailsPanel activeChat={activeChat} isVisible={isVisible} togglePanel={togglePanel} />
    </div>
  );
};

export default Inbox;
