import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import ChatsPanel from '@/components/pages/inbox/ChatsPanel';
import ChatPanel from '@/components/pages/inbox/ChatPanel';
import DetailsPanel from '@/components/pages/inbox/DetailsPanel';
import { chats } from '@/data/mockData';

type ViewState = 'list' | 'chat';

const Inbox: React.FC = () => {
  const [activeChat, setActiveChat] = useState(chats[0]);
  const [mobileView, setMobileView] = useState<ViewState>('list');
  
  // Handle mobile view state
  const handleChatSelect = (chat: typeof activeChat) => {
    setActiveChat(chat);
    // On mobile, switch to chat view when a chat is selected
    if (window.innerWidth < 768) {
      setMobileView('chat');
    }
  };

  // Return to chat list on mobile
  const handleBackToList = () => {
    setMobileView('list');
  };

  // Reset to list view on large screen
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileView('list');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div className="flex flex-1 flex-col md:flex-row overflow-hidden h-full">
      <div className={`${mobileView === 'list' ? 'block' : 'hidden'} md:block md:flex-none md:w-80`}>
        <ChatsPanel 
          chats={chats}
          activeChat={activeChat}
          onChatSelect={handleChatSelect}
        />
      </div>
      
      <div className={`${mobileView === 'chat' ? 'flex' : 'hidden'} md:flex flex-1 flex-col relative`}>
        {/* Mobile back button */}
        <button 
          onClick={handleBackToList}
          className="md:hidden absolute top-4 left-4 z-10 bg-white rounded-full p-1 shadow-md"
          aria-label="Back to chat list"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        
        <ChatPanel activeChat={activeChat} />
        <DetailsPanel activeChat={activeChat} />
      </div>
    </div>
  );
};

export default Inbox;
