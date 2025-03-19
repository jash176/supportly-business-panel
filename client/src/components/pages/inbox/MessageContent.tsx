// import { Image } from "@radix-ui/react-avatar";
import AudioPlayer from "@/components/ui/audio-player";
import { FileAudio, FileText } from "lucide-react";

interface MessageContentProps {
  contentType: "text" | "image" | "audio" | "email_prompt";
  content: string;
  className?: string;
}

export const MessageContent: React.FC<MessageContentProps> = ({
  contentType,
  content,
  className = "",
}) => {
  switch (contentType) {
    case "image":
      return (
        <div className={`relative ${className}`}>
          <img
            src={`https://supportly.site${content}`}
            alt="Message image"
            width={300}
            height={200}
            className="rounded-lg max-w-full object-cover"
          />
        </div>
      );

    case "audio":
      return (
        <AudioPlayer src={`https://supportly.site${content}`} />
      );

    case "text":
    default:
      return <p className={className}>{content}</p>;
  }
};
