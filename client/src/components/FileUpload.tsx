import { useRef, useState, ChangeEvent } from "react";
import { Button } from "./ui/button";
import { Share } from "lucide-react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  render?: (onClick: () => void) => React.ReactNode;
}

export const FileUpload: React.FC<FileUploadProps> = ({ 
  onFileSelect, 
  accept = "image/*,video/*,.pdf,.doc,.docx",
  render 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      setIsLoading(true);
      const file = event.target.files?.[0];

      if (!file) {
        console.log("No file selected");
        return;
      }

      // Validate file size (e.g., 10MB limit)
      const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
      if (file.size > MAX_FILE_SIZE) {
        alert("File size should be less than 10MB");
        return;
      }

      console.log("File selected:", {
        name: file.name,
        size: file.size,
        type: file.type,
      });

      onFileSelect(file);
    } catch (error) {
      console.error("Error handling file:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <input
        type="file"
        ref={inputRef}
        onChange={handleChange}
        accept={accept}
        className="hidden"
      />
      {render ? (
        render(handleClick)
      ) : (
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 w-full"
          onClick={handleClick}
          disabled={isLoading}
        >
          <Share className={`h-3 w-3 ${isLoading ? "animate-spin" : ""}`} />
          <span className="text-xs">
            {isLoading ? "Processing..." : "Share a file"}
          </span>
        </Button>
      )}
    </>
  );
};
