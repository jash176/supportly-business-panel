import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Mic, Square } from "lucide-react";

interface AudioRecorderProps {
  onRecordingComplete: (blob: Blob) => void;
  onCancel: () => void;
}

export function AudioRecorder({
  onRecordingComplete,
  onCancel,
}: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (mediaRecorderRef.current?.state === "recording") {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const cleanupRecording = () => {
    if (timerRef.current) {
      console.log("clearing interval");
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {
        console.error("Error stopping media recorder:", e);
      }
    }

    setRecordingTime(0);
    setIsRecording(false);
  };

  const startRecording = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      cleanupRecording();

      setRecordingTime(0);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
        audioBitsPerSecond: 128000,
      });

      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        console.log("Stopped recording");
        setIsRecording(false); // Ensure it stops properly
        setRecordingTime(0); // Reset recording time
        if (chunksRef.current.length > 0) {
          const audioBlob = new Blob(chunksRef.current, {
            type: "audio/webm",
          });
          setAudioBlob(audioBlob);
        }
      };
      mediaRecorder.start();

      setIsRecording(true);

      // Ensure the timer runs every second
      let startTime = Date.now();
      if (!timerRef.current) {
        console.log("Started recording timer");
        timerRef.current = setInterval(() => {
          console.log("Started recording timer");
          setRecordingTime(Math.floor((Date.now() - startTime) / 1000));
        }, 1000);
      }
    } catch (error) {
      console.error("Error accessing microphone:", error);
      onCancel();
    }
  };

  const stopRecording = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isRecording) return;

    // Stop the timer first to prevent further updates
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setRecordingTime(0); // Reset recording time immediately after clearing interval
    }

    // Set isRecording to false after clearing the interval
    setIsRecording(false);

    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      try {
        mediaRecorderRef.current.requestData(); // Request any remaining data
        mediaRecorderRef.current.stop();
      } catch (error) {
        console.error("Error stopping recording:", error);
      }
    }
    // Stop microphone stream to release resources
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const handleSend = () => {
    if (audioBlob) {
      onRecordingComplete(audioBlob);
    }
  };

  const resetRecording = () => {
    setAudioBlob(null);
    setRecordingTime(0);
    setIsRecording(false);
    onCancel();
  };

  console.log("Recording : ", { isRecording, audioBlob });

  return (
    <div className="flex items-center gap-2 p-2">
      {!audioBlob ? (
        <Button
          variant={isRecording ? "destructive" : "ghost"}
          size="sm"
          onClick={isRecording ? stopRecording : startRecording}
        >
          {isRecording ? (
            <div className="flex items-center gap-2">
              <Square className="h-4 w-4 animate-pulse" />
              <span className="text-xs">{formatTime(recordingTime)}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Mic className="h-4 w-4" />
              <span className="text-xs">Record audio message</span>
            </div>
          )}
        </Button>
      ) : (
        <div className="flex items-center gap-2">
          <Button variant="default" size="sm" onClick={handleSend}>
            <span className="text-xs">Send ({formatTime(recordingTime)})</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={resetRecording}>
            <span className="text-xs">Cancel</span>
          </Button>
        </div>
      )}
    </div>
  );
}
