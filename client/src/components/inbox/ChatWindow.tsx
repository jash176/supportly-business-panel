import { useState } from 'react';
import { Phone, Video, MoreVertical, Paperclip, Send, Smile } from 'lucide-react';
import { messages, users, currentUser } from '@/lib/mockData';
import { cn } from '@/lib/utils';

interface ChatWindowProps {
  selectedChatId: string;
}

const ChatWindow = ({ selectedChatId }: ChatWindowProps) => {
  const [newMessage, setNewMessage] = useState('');
  
  // Get the selected user based on the chat
  const selectedUser = users.find(user => user.id === selectedChatId);
  
  // Filter messages for this chat
  const chatMessages = messages.filter(
    message => 
      (message.senderId === selectedChatId && message.receiverId === currentUser.id) ||
      (message.senderId === currentUser.id && message.receiverId === selectedChatId)
  );
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newMessage.trim() === '') return;
    
    // In a real app, you would send the message to the backend
    // and update the messages state after success
    console.log('Sending message:', newMessage);
    
    // Clear the input field
    setNewMessage('');
  };
  
  if (!selectedUser) {
    return (
      <div className="hidden sm:flex flex-col flex-grow h-full bg-gray-50 items-center justify-center">
        <div className="text-gray-500 text-center">
          <div className="mb-2">👋</div>
          <p>Select a chat to start messaging</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="hidden sm:flex flex-col flex-grow h-full bg-gray-50">
      {/* Chat Header */}
      <div className="px-6 py-4 bg-white border-b border-gray-200 flex items-center">
        <div className="flex-grow">
          <div className="flex items-center">
            <div className="relative mr-3">
              <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                <img 
                  src={selectedUser.avatar} 
                  alt={selectedUser.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              {selectedUser.status === 'online' && (
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success rounded-full border-2 border-white"></div>
              )}
            </div>
            <div>
              <h2 className="font-semibold">{selectedUser.name}</h2>
              <p className="text-xs text-gray-500">{selectedUser.status === 'online' ? 'Online' : 'Offline'}</p>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="p-2 text-gray-500 hover:text-primary">
            <Phone className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-primary">
            <Video className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-primary">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Chat Messages */}
      <div className="flex-grow overflow-y-auto p-6 space-y-4 scrollbar-hide">
        {/* Time Separator */}
        <div className="flex justify-center">
          <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Today, 10:30 AM</span>
        </div>
        
        {chatMessages.map((message) => {
          const isCurrentUser = message.senderId === currentUser.id;
          const sender = isCurrentUser ? currentUser : selectedUser;
          
          return (
            <div 
              key={message.id}
              className={cn(
                "flex items-end max-w-xs md:max-w-md",
                isCurrentUser && "justify-end ml-auto"
              )}
            >
              {!isCurrentUser && (
                <div className="flex-shrink-0 mr-2">
                  <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
                    <img 
                      src={sender.avatar} 
                      alt={sender.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              )}
              
              <div>
                <div className={cn(
                  "p-3 rounded-lg shadow-sm",
                  isCurrentUser 
                    ? "bg-primary text-white chat-bubble-sent" 
                    : "bg-white chat-bubble-received text-gray-800"
                )}>
                  <p>{message.text}</p>
                </div>
                
                <div className={cn("mt-1 flex text-xs text-gray-500", 
                  isCurrentUser && "justify-end"
                )}>
                  <span>{message.timestamp}</span>
                  {isCurrentUser && message.read && (
                    <span className="ml-1 text-primary">✓✓</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Message Input Area */}
      <div className="p-4 bg-white border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="flex items-center">
          <button type="button" className="p-2 text-gray-500 hover:text-primary">
            <Paperclip className="h-5 w-5" />
          </button>
          <div className="flex-grow mx-2 relative">
            <input 
              type="text" 
              placeholder="Type a message..." 
              className="w-full px-4 py-2 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button type="button" className="absolute right-3 top-2 text-gray-400 hover:text-primary">
              <Smile className="h-5 w-5" />
            </button>
          </div>
          <button 
            type="submit" 
            className="p-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
            disabled={newMessage.trim() === ''}
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
