import { useState, useEffect, useRef } from "react";
import {
  Smile,
  Send,
  UserPlus,
  MoreHorizontal,
  Type,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatRelative } from "date-fns";
import { useMediaQuery } from "@/hooks/use-media";
import { Chat } from "@/lib/api/inbox";
import { useMessages } from "@/hooks/useMessages";
import { Loader2 } from "lucide-react";
import { Message } from "@/lib/api/messages";
import { MessageContent } from "./MessageContent";
import { FileUpload } from "@/components/FileUpload";
import { AudioRecorder } from "@/components/AudioRecorder";
import { FilePreview } from "@/components/FilePreview";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSendMessage } from "@/hooks/useSendMessage";
import { useAuth } from "@/context/auth";

interface ChatPanelProps {
  activeChat: Chat | null;
  onUserDetailsClick: () => void;
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const ChatPanel: React.FC<ChatPanelProps> = ({ activeChat }) => {
  const {user} = useAuth()
  const {
    data: messages,
    isLoading,
    error,
  } = useMessages({
    sessionId: activeChat?.sid ?? "",
  });
  const {mutateAsync: sendMessage} = useSendMessage()

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

  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | Blob | null>(null);

  console.log("Selected File : ", selectedFile);

  // Scroll to bottom of messages whenever messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "instant" });
  }, [messages]);

  const handleSendMessage = async (
    content: string,
    type: "text" | "image" | "audio",
    mediaUrl?: Blob | File
  ) => {
    if (!user || !activeChat) return;
    if (type === "text" && !content.trim()) return;
  
    const formData = new FormData();
    
    // Add required fields
    formData.append("businessId", user.businessId.toString());
    formData.append("sessionId", activeChat.sid);
    formData.append("sender", "business");
    formData.append("contentType", type);
    
    // Add optional fields
    if (activeChat.customerEmail) {
      formData.append("customerEmail", activeChat.customerEmail);
    }
  
    // Add content based on type
    if (type === "text") {
      formData.append("content", content);
    } else if (type === "image") {
      if (!mediaUrl) return;
      formData.append("file", mediaUrl);
    }else if (type === "audio") {
      if (!mediaUrl) return;
      formData.append("file", mediaUrl, "audio.webm");
    }
    try {
      const response = await sendMessage(formData);
      if (response.success) {
        // Clear inputs after successful send
        setNewMessage("");
        setSelectedFile(null);
      }
    } catch (error) {
      // console.error("Error sending message:", error);
      // Handle error (show toast notification, etc.)
    }
  };

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    setIsMoreMenuOpen(false);
  };

  const handleAudioRecording = async (blob: Blob) => {
    try {
      const formData = new FormData();
      formData.append("audio", blob, "recording.webm");
      formData.append("sessionId", activeChat?.sid ?? "");

      // Add your audio upload API call here
      console.log("Uploading audio recording");

      // Close dropdown after upload
      setIsMoreMenuOpen(false);
    } catch (error) {
      console.error("Error uploading audio:", error);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col bg-gray-50 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        <p className="mt-4 text-sm text-gray-500">Loading conversation...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex-1 flex flex-col bg-gray-50 items-center justify-center">
        <p className="text-destructive text-lg">Failed to load messages</p>
        <p className="text-sm text-muted-foreground mt-2">
          {error instanceof Error ? error.message : "Please try again later"}
        </p>
      </div>
    );
  }

  // Show empty state when no active chat
  if (!activeChat) {
    return (
      <div className="flex-1 flex flex-col bg-gray-50 items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No conversation selected
          </h3>
          <p className="text-gray-500">
            Select a conversation from the list to start chatting with your
            customers
          </p>
        </div>
      </div>
    );
  }

  // Show empty conversation state
  if (!messages?.data || messages.data.length === 0) {
    return (
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Keep the header */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center">
            <div className="relative">
              <Avatar className="w-10 h-10">
                <AvatarImage src="" alt={activeChat.name} />
                <AvatarFallback className="bg-indigo-100 text-indigo-600">
                  {getInitials(activeChat.name)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="ml-3">
              <h3 className="font-semibold text-gray-900">{activeChat.name}</h3>
              <p className="text-xs text-gray-500">
                {/* {activeChat.person.isOnline ? "Online" : "Offline"} • Last active{" "} */}
                {formatRelative(
                  new Date(activeChat.lastMessageTime),
                  new Date()
                )}
              </p>
            </div>
            <div className="ml-auto flex">
              <div className="lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="More Options"
                  // onClick={onUserDetailsClick}
                >
                  <UserPlus className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md p-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Start the conversation
            </h3>
            <p className="text-gray-500 mb-4">
              No messages in this conversation yet. Send a message to get
              started.
            </p>
          </div>
        </div>

        {/* Keep the message input */}
        <div className="m-4 border border-gray-700 rounded-lg bg-white p-2 overflow-hidden">
          {selectedFile && (
            <div className="mb-2">
              <FilePreview
                file={selectedFile}
                onRemove={() => setSelectedFile(null)}
                onSend={(type) => handleSendMessage("", type, selectedFile)}
              />
            </div>
          )}
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
                  handleSendMessage(newMessage, "text");
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
              <DropdownMenu
                open={isMoreMenuOpen}
                onOpenChange={setIsMoreMenuOpen}
              >
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 h-8 w-8"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-white border p-1"
                >
                  <DropdownMenuItem className="p-0">
                    <FileUpload onFileSelect={handleFileSelect} />
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-0">
                    <AudioRecorder
                      onCancel={() => setIsMoreMenuOpen(false)}
                      onRecordingComplete={handleAudioRecording}
                    />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                className="bg-blue-600 hover:bg-blue-700 ml-1 h-8 w-8 p-0"
                aria-label="Send message"
                onClick={() => handleSendMessage(newMessage, "text")}
                disabled={!newMessage.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Group messages by date
  const groupedMessages: { [date: string]: Message[] } = {};

  messages.data.forEach((message) => {
    const date = new Date(message.timestamp).toDateString();
    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }
    groupedMessages[date].push(message);
  });
  console.log("groupedMessages : ", groupedMessages)
  return (
    <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center">
          <div className="relative">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-indigo-100 text-indigo-600">
                {getInitials(activeChat.name)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="ml-3">
            <h3 className="font-semibold text-gray-900">{activeChat.name}</h3>
            <p className="text-xs text-gray-500">
              Last message{" "}
              {formatRelative(new Date(activeChat.lastMessageTime), new Date())}
            </p>
          </div>
          <div className="ml-auto flex">
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                aria-label="More Options"
                // onClick={onUserDetailsClick}
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
              {messages.map((message) => {
                const isSender = message.sender === "business";
                const isCustomer = message.sender === "customer";
                if (message.contentType === "email_prompt") return null;
                return (
                  <div
                    key={message.id}
                    className={`flex items-end ${
                      isSender ? "justify-end" : ""
                    } my-7`}
                  >
                    {!isSender && (
                      <Avatar className="w-8 h-8 mr-2">
                        <AvatarImage src="" alt={activeChat.name} />
                        <AvatarFallback className="bg-indigo-100 text-indigo-600 text-sm">
                          {getInitials(activeChat.name)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[75%] w-fit rounded-lg p-3 shadow-sm ${
                        isSender && message.contentType === "text"
                          ? "bg-indigo-500 text-white"
                          : isCustomer && message.contentType === "text" ? "bg-white text-gray-800" : ""
                      }`}
                    >
                      <MessageContent
                        contentType={message.contentType}
                        content={message.content}
                        className={isSender ? "text-white" : "text-gray-800"}
                      />
                      <span
                        className={`text-xs mt-1 block ${
                          isSender ? "text-gray-200" : "text-gray-500"
                        }`}
                      >
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>
      </div>
      <div className="m-4 border border-gray-700 rounded-lg bg-white p-2 overflow-hidden">
        {selectedFile && (
          <div className="mb-2">
            <FilePreview
              file={selectedFile}
              fileName="Audio Recording.webm"
              onRemove={() => setSelectedFile(null)}
              onSend={(type) => handleSendMessage("", type, selectedFile)}
            />
          </div>
        )}
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
                handleSendMessage(newMessage, "text");
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
            <DropdownMenu
              open={isMoreMenuOpen}
              onOpenChange={setIsMoreMenuOpen}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 h-8 w-8"
                >
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-white border p-1"
              >
                <DropdownMenuItem className="flex items-center cursor-pointer py-2 px-3 gap-2">
                  <FileUpload onFileSelect={handleFileSelect} />
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer py-2 px-3">
                  <AudioRecorder
                    onRecordingComplete={(blob) => {
                      setSelectedFile(blob);
                      console.log("Audio ready:", URL.createObjectURL(blob));
                    }}
                    onCancel={() => {
                      console.log("Recording cancelled.");
                    }}
                  />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              className="bg-blue-600 hover:bg-blue-700 ml-1 h-8 w-8 p-0"
              aria-label="Send message"
              onClick={() => handleSendMessage(newMessage, "text")}
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
