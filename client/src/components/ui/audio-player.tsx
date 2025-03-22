import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Pause, Play } from "lucide-react"

interface Props {
    src: string
}
export default function AudioPlayer({src}: Props) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number.parseFloat(e.target.value)
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.addEventListener("timeupdate", handleTimeUpdate)
      audio.addEventListener("loadedmetadata", handleLoadedMetadata)

      return () => {
        audio.removeEventListener("timeupdate", handleTimeUpdate)
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      }
    }
  }, [])

  return (
    <div className="flex items-center gap-3 p-2 bg-gray-100 rounded-lg max-w-md">
      <audio ref={audioRef} src={src} />

      <button
        onClick={togglePlayPause}
        className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded text-white"
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </button>

      <input
        type="range"
        min={0}
        max={duration || 100}
        value={currentTime}
        onChange={handleSliderChange}
        className="flex-1 h-1 bg-gray-300 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
        style={{
          background: `linear-gradient(to right, #3b82f6 ${(currentTime / (duration || 1)) * 100}%, #d1d5db ${(currentTime / (duration || 1)) * 100}%)`,
        }}
      />

      <span className="text-xs text-gray-600 min-w-[32px]">{formatTime(currentTime)}</span>
    </div>
  )
}

