import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Share } from "lucide-react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
}

export function FileUpload({
  onFileSelect,
  accept = "image/*,video/*,.pdf,.doc,.docx",
}: FileUploadProps) {
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent any default button behavior
    e.stopPropagation(); // Stop event bubbling
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
        ref={fileInputRef}
        className="hidden"
        accept={accept}
        onChange={handleFileChange}
        onClick={(e) => e.stopPropagation()} // Prevent click event bubbling
      />
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
    </>
  );
}
