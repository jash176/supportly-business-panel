import { useState, useEffect } from 'react';
import ChatsPanel from '@/components/pages/inbox/ChatsPanel';
import ChatPanel from '@/components/pages/inbox/ChatPanel';
import DetailsPanel from '@/components/pages/inbox/DetailsPanel';
import MobileAppDownload from '@/components/MobileAppDownload';
import { chats } from '@/data/mockData';

const Inbox: React.FC = () => {
  const [activeChat, setActiveChat] = useState(chats[0]);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);
  
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
      <ChatPanel activeChat={activeChat} />
      <DetailsPanel activeChat={activeChat} />
    </div>
  );
};

export default Inbox;
