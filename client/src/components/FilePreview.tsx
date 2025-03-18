import { useState, useRef, useEffect } from "react";
import { X, Play, Pause } from "lucide-react";
import { Button } from "./ui/button";

interface FilePreviewProps {
  file: File | Blob;
  fileName?: string;
  onRemove: () => void;
  onSend: () => void; // Add this prop
}

export function FilePreview({
  file,
  fileName,
  onRemove,
  onSend,
}: FilePreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setAudioUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const isImage = file instanceof File && file.type.startsWith("image/");
  const isAudio = file instanceof Blob && file.type.includes("audio");
  const displayName =
    fileName || (file instanceof File ? file.name : "Recording");

  return (
    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
      {isImage ? (
        <img
          src={URL.createObjectURL(file)}
          alt="Preview"
          className="h-10 w-10 object-cover rounded"
        />
      ) : isAudio ? (
        <div className="flex items-center gap-2">
          <audio
            ref={audioRef}
            src={audioUrl || undefined}
            onEnded={() => setIsPlaying(false)}
          />
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={handlePlayPause}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
        </div>
      ) : (
        <div className="h-10 w-10 flex items-center justify-center bg-gray-200 rounded">
          <span className="text-xs font-medium">
            {displayName.split(".").pop()}
          </span>
        </div>
      )}

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{displayName}</p>
        <p className="text-xs text-gray-500">
          {file instanceof File
            ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
            : "Audio Recording"}
        </p>
      </div>

      <Button variant="default" size="sm" className="h-8 px-3" onClick={onSend}>
        Send
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={onRemove}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
