// import { Image } from "@radix-ui/react-avatar";
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
        <div className={`flex items-center gap-2 ${className}`}>
          <FileAudio className="h-5 w-5" />
          <audio controls className="max-w-[250px]">
            <source src={content} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      );

    case "text":
    default:
      return <p className={className}>{content}</p>;
  }
};
