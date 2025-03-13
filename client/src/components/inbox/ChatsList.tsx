import { useState } from 'react';
import { Search } from 'lucide-react';
import { chats, users } from '@/lib/mockData';
import { cn } from '@/lib/utils';

interface ChatsListProps {
  selectedChatId: string;
  onChatSelect: (chatId: string) => void;
}

const ChatsList = ({ selectedChatId, onChatSelect }: ChatsListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Combine chats with user data
  const chatsWithUserData = chats.map(chat => {
    const user = users.find(user => user.id === chat.userId);
    return { ...chat, user };
  });
  
  // Filter chats based on search query
  const filteredChats = searchQuery.trim() === ''
    ? chatsWithUserData
    : chatsWithUserData.filter(chat => 
        chat.user?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
  return (
    <div className="w-full sm:w-80 border-r border-gray-200 flex flex-col h-full bg-white overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold">Inbox</h1>
        <div className="mt-2 relative">
          <input 
            type="text" 
            placeholder="Search messages..." 
            className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        </div>
      </div>
      
      <div className="overflow-y-auto flex-grow scrollbar-hide">
        {filteredChats.map((chat) => (
          <div 
            key={chat.id}
            className={cn(
              "p-3 hover:bg-gray-100 cursor-pointer border-l-4",
              selectedChatId === chat.id ? "border-primary" : "border-transparent"
            )}
            onClick={() => onChatSelect(chat.id)}
          >
            <div className="flex items-start gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
                  <img 
                    src={chat.user?.avatar} 
                    alt={chat.user?.name || 'User'} 
                    className="h-full w-full object-cover"
                  />
                </div>
                {chat.user?.status === 'online' && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex justify-between">
                  <h3 className="font-medium truncate">{chat.user?.name}</h3>
                  <span className="text-xs text-gray-500">{chat.lastMessageTime}</span>
                </div>
                <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
              </div>
            </div>
          </div>
        ))}
        
        {filteredChats.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No chats match your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatsList;
