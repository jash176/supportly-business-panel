import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Chat } from '@/data/mockData';
import { formatDistanceToNow } from 'date-fns';

interface ChatsPanelProps {
  chats: Chat[];
  activeChat: Chat | null;
  onChatSelect: (chat: Chat) => void;
}

const ChatsPanel: React.FC<ChatsPanelProps> = ({ chats, activeChat, onChatSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = searchQuery.trim() 
    ? chats.filter(chat => 
        chat.person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.lastMessage.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : chats;

  return (
    <div className="w-full md:w-80 bg-white border-r border-gray-200 flex-shrink-0 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Conversations</h2>
        <div className="mt-2 relative">
          <Input
            type="text"
            placeholder="Search chats"
            className="w-full pl-10 pr-4 py-2 bg-gray-100"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
        </div>
      </div>
      
      <div className="overflow-y-auto h-full scrollbar-hide">
        {filteredChats.map((chat) => (
          <div 
            key={chat.id}
            className={`p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer ${activeChat?.id === chat.id ? 'bg-gray-50' : ''}`}
            onClick={() => onChatSelect(chat)}
          >
            <div className="flex items-start">
              <div className="relative mr-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={chat.person.avatar} alt={chat.person.name} />
                  <AvatarFallback>{chat.person.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className={`absolute bottom-0 right-0 w-3 h-3 ${chat.person.isOnline ? 'bg-green-500' : 'bg-gray-300'} border-2 border-white rounded-full`}></span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-gray-900 truncate">{chat.person.name}</h3>
                  <span className="text-xs text-gray-500">{formatDistanceToNow(new Date(chat.lastMessage.timestamp), { addSuffix: false })}</span>
                </div>
                <p className="text-sm text-gray-600 truncate">{chat.lastMessage.text}</p>
              </div>
            </div>
          </div>
        ))}
        
        {filteredChats.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-gray-500">No conversations found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatsPanel;
