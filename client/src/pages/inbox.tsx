import { useState } from 'react';
import ChatsList from '@/components/inbox/ChatsList';
import ChatWindow from '@/components/inbox/ChatWindow';
import ChatDetails from '@/components/inbox/ChatDetails';

const InboxPage = () => {
  const [selectedChatId, setSelectedChatId] = useState('1'); // Default to first chat
  
  return (
    <div className="h-full flex">
      <ChatsList 
        selectedChatId={selectedChatId} 
        onChatSelect={setSelectedChatId} 
      />
      
      <ChatWindow selectedChatId={selectedChatId} />
      
      <ChatDetails selectedChatId={selectedChatId} />
    </div>
  );
};

export default InboxPage;
