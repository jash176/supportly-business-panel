import { useState, useEffect, useRef } from 'react';
import { Phone, Video, MoreVertical, Smile, Paperclip, Send } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Chat, Message } from '@/data/mockData';
import { Textarea } from '@/components/ui/textarea';
import { formatRelative } from 'date-fns';

interface ChatPanelProps {
  activeChat: Chat | null;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ activeChat }) => {
  const [newMessage, setNewMessage] = useState('');
  const messageEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages whenever messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // In a real app, this would send the message to an API
    console.log('Sending message:', newMessage);
    
    // Clear the input after sending
    setNewMessage('');
  };

  // Group messages by date
  const groupedMessages: { [date: string]: Message[] } = {};
  
  activeChat?.messages.forEach(message => {
    const date = new Date(message.timestamp).toDateString();
    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }
    groupedMessages[date].push(message);
  });

  if (!activeChat) {
    return (
      <div className="flex-1 flex flex-col bg-gray-50 items-center justify-center">
        <div className="text-center p-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No conversation selected</h3>
          <p className="text-gray-500">Choose a conversation from the list to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center">
          <div className="relative">
            <Avatar className="w-10 h-10">
              <AvatarImage src={activeChat.person.avatar} alt={activeChat.person.name} />
              <AvatarFallback>{activeChat.person.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 ${activeChat.person.isOnline ? 'bg-green-500' : 'bg-gray-300'} border-2 border-white rounded-full`}></span>
          </div>
          <div className="ml-3">
            <h3 className="font-semibold text-gray-900">{activeChat.person.name}</h3>
            <p className="text-xs text-gray-500">
              {activeChat.person.isOnline ? 'Online' : 'Offline'} • Last active {formatRelative(new Date(activeChat.person.lastActive), new Date())}
            </p>
          </div>
          <div className="ml-auto flex">
            <Button variant="ghost" size="icon" aria-label="Phone Call">
              <Phone className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Video Call">
              <Video className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="More Options">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
        <div className="space-y-4">
          {Object.entries(groupedMessages).map(([date, messages]) => (
            <div key={date}>
              {/* Timestamp divider */}
              <div className="flex items-center justify-center my-4">
                <div className="border-t border-gray-200 flex-grow"></div>
                <div className="mx-4 text-xs text-gray-500 font-medium">{formatRelative(new Date(date), new Date())}</div>
                <div className="border-t border-gray-200 flex-grow"></div>
              </div>
              
              {/* Messages */}
              {messages.map((message) => (
                <div 
                  key={message.id}
                  className={`flex items-end ${message.isSender ? 'justify-end' : ''}`}
                >
                  {!message.isSender && (
                    <Avatar className="w-8 h-8 mr-2">
                      <AvatarImage src={activeChat.person.avatar} alt={activeChat.person.name} />
                      <AvatarFallback>{activeChat.person.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                  <div 
                    className={`max-w-[75%] w-fit rounded-lg p-3 shadow-sm ${
                      message.isSender 
                        ? 'bg-indigo-500 text-white' 
                        : 'bg-white text-gray-800'
                    }`}
                  >
                    <p>{message.text}</p>
                    <span className={`text-xs mt-1 block ${message.isSender ? 'text-gray-200' : 'text-gray-500'}`}>
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>
      </div>
      
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-end">
          <Button variant="ghost" size="icon" aria-label="Insert emoji">
            <Smile className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Attach file">
            <Paperclip className="w-5 h-5" />
          </Button>
          <div className="flex-1 mx-2">
            <Textarea 
              rows={1}
              placeholder="Type a message..." 
              className="w-full p-3 bg-gray-100 rounded-md resize-none"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
          </div>
          <Button 
            className="rounded-full"
            aria-label="Send message"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
