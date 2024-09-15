// components/ProgressBar.tsx
import React, { useEffect, useState } from 'react'

const ProgressBar = ({
  audioRef,
  onSeek,
}: {
  audioRef: React.RefObject<HTMLAudioElement>
  onSeek: (event: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime)
        setDuration(audioRef.current.duration || 0)
      }
    }

    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', updateProgress)
      return () => {
        if (audioRef.current) {
          // Check if audioRef.current is not null
          audioRef.current.removeEventListener('timeupdate', updateProgress)
        }
      }
    }
  }, [audioRef.current])

  return (
    <div className="w-full flex flex-col items-center my-2">
      <input
        type="range"
        min={0}
        max={duration}
        value={currentTime}
        onChange={onSeek}
        className="w-full"
      />
    </div>
  )
}

export default ProgressBar
