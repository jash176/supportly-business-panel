import { useRef, useState, ChangeEvent, MouseEvent } from "react";
import { Button } from "./ui/button";
import { Share } from "lucide-react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  accept = "image/*,.pdf,.doc,.docx",
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = (e: any) => {
    e.preventDefault(); // Prevent any default button behavior
    e.stopPropagation(); // Stop event bubbling
    if (inputRef.current) {
      inputRef.current.value = ""; // Allow same file to be re-selected
      inputRef.current.click();
    }
  };

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    console.log("handleChange");
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("onChange triggered");
    handleChange(e);
  };

  return (
    <>
      <input
        type="file"
        ref={inputRef}
        onChange={handleInputChange}
        accept={accept}
        className="hidden"
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
};
