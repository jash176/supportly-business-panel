import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { Chat } from "@/lib/api/inbox";

interface ChatsPanelProps {
  chats: Chat[];
  activeChat: Chat | null;
  onChatSelect: (chat: Chat) => void;
}

const ChatsPanel: React.FC<ChatsPanelProps> = ({
  chats,
  activeChat,
  onChatSelect,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = searchQuery.trim()
    ? chats.filter(
        (chat) =>
          chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
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
            key={chat.sid}
            className={`p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer ${
              activeChat?.sid === chat.sid ? "bg-gray-50" : ""
            }`}
            onClick={() => onChatSelect(chat)}
          >
            <div className="flex items-start">
              <div className="relative mr-3">
                <Avatar className="w-12 h-12">
                  <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {/* <span
                  className={`absolute bottom-0 right-0 w-3 h-3 ${
                    chat.person.isOnline ? "bg-green-500" : "bg-gray-300"
                  } border-2 border-white rounded-full`}
                ></span> */}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {chat.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                  {chat.unreadMessages > 0 && (
                      <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-600 rounded-full">
                        {chat.unreadMessages}
                      </span>
                    )}
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(chat.lastMessageTime), {
                      addSuffix: false,
                    })}
                  </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {chat.lastMessage}
                </p>
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
