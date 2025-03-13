import { useState, useEffect, useRef } from "react";
import {
  Phone,
  Video,
  MoreVertical,
  Smile,
  Paperclip,
  Send,
  UserPlus,
  MoreHorizontal,
  Type,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Chat, Message } from "@/data/mockData";
import { Textarea } from "@/components/ui/textarea";
import { formatRelative } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useMediaQuery } from "@/hooks/use-media";

interface ChatPanelProps {
  activeChat: Chat | null;
  onUserDetailsClick: () => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({
  activeChat,
  onUserDetailsClick,
}) => {
  const [newMessage, setNewMessage] = useState("");
  const messageEndRef = useRef<HTMLDivElement>(null);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const isMediumScreen = useMediaQuery("(max-width: 768px)");

  // Determine which buttons to show based on screen size
  const visibleButtons = isSmallScreen ? 3 : isMediumScreen ? 4 : 6;

  const allButtons = [
    { name: "Shortcuts", onClick: () => console.log("Shortcuts clicked") },
    {
      name: "Create Meet Link",
      onClick: () => console.log("Knowledge Base clicked"),
    },
  ];

  const visibleButtonsArray = allButtons.slice(0, visibleButtons);
  const hiddenButtonsArray = allButtons.slice(visibleButtons);

  // Scroll to bottom of messages whenever messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // In a real app, this would send the message to an API
    console.log("Sending message:", newMessage);

    // Clear the input after sending
    setNewMessage("");
  };

  // Group messages by date
  const groupedMessages: { [date: string]: Message[] } = {};

  activeChat?.messages.forEach((message) => {
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
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No conversation selected
          </h3>
          <p className="text-gray-500">
            Choose a conversation from the list to start chatting
          </p>
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
              <AvatarImage
                src={activeChat.person.avatar}
                alt={activeChat.person.name}
              />
              <AvatarFallback>
                {activeChat.person.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span
              className={`absolute bottom-0 right-0 w-2.5 h-2.5 ${
                activeChat.person.isOnline ? "bg-green-500" : "bg-gray-300"
              } border-2 border-white rounded-full`}
            ></span>
          </div>
          <div className="ml-3">
            <h3 className="font-semibold text-gray-900">
              {activeChat.person.name}
            </h3>
            <p className="text-xs text-gray-500">
              {activeChat.person.isOnline ? "Online" : "Offline"} • Last active{" "}
              {formatRelative(
                new Date(activeChat.person.lastActive),
                new Date()
              )}
            </p>
          </div>
          <div className="ml-auto flex">
            {/* <Button variant="ghost" size="icon" aria-label="Phone Call">
              <Phone className="w-5 h-5" />
            </Button> */}
            {/* <Button variant="ghost" size="icon" aria-label="Video Call">
              <Video className="w-5 h-5" />
            </Button> */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                aria-label="More Options"
                onClick={onUserDetailsClick}
              >
                <UserPlus className="w-5 h-5" />
              </Button>
            </div>
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
                <div className="mx-4 text-xs text-gray-500 font-medium">
                  {formatRelative(new Date(date), new Date())}
                </div>
                <div className="border-t border-gray-200 flex-grow"></div>
              </div>

              {/* Messages */}
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-end ${
                    message.isSender ? "justify-end" : ""
                  } my-7`}
                >
                  {!message.isSender && (
                    <Avatar className="w-8 h-8 mr-2">
                      <AvatarImage
                        src={activeChat.person.avatar}
                        alt={activeChat.person.name}
                      />
                      <AvatarFallback>
                        {activeChat.person.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[75%] w-fit rounded-lg p-3 shadow-sm ${
                      message.isSender
                        ? "bg-indigo-500 text-white"
                        : "bg-white text-gray-800"
                    }`}
                  >
                    <p>{message.text}</p>
                    <span
                      className={`text-xs mt-1 block ${
                        message.isSender ? "text-gray-200" : "text-gray-500"
                      }`}
                    >
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>
      </div>
      <div className="m-4 border border-gray-700 rounded-lg bg-white p-2 overflow-hidden">
        <div className="flex items-center gap-1 mb-2 border-b border-gray-800 pb-1">
          {visibleButtonsArray.map((button) => (
            <Button
              key={button.name}
              variant="ghost"
              size="sm"
              className="text-[#495462] text-xs rounded font-semibold"
              onClick={button.onClick}
            >
              {button.name}
            </Button>
          ))}

          {hiddenButtonsArray.length > 0 && (
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 text-xs font-normal rounded ml-auto"
                >
                  {dropdownOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {hiddenButtonsArray.map((button) => (
                  <DropdownMenuItem
                    key={button.name}
                    onClick={button.onClick}
                    className="text-xs"
                  >
                    {button.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <div className="ml-auto">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 text-xs font-normal rounded flex items-center gap-1"
            >
              MagicReply
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>

        <div className="flex items-center">
          <Textarea
            placeholder="Send your message to Shiv in email..."
            className="flex-1 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none p-0 text-black placeholder:text-gray-500 min-h-0"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />

          <div className="flex items-center gap-1 ml-auto">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 h-8 w-8"
            >
              <Type className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 h-8 w-8"
            >
              <Smile className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 h-8 w-8"
            >
              <MoreHorizontal className="h-5 w-5" />
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 ml-1 h-8 w-8 p-0"
              aria-label="Send message"
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
