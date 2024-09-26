import React, { useEffect, useState } from 'react'

const ProgressBar = ({
  audioRef,
  onSeek,
}: {
  audioRef: React.RefObject<HTMLAudioElement>
  onSeek: (time: number) => void
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

    const audioElement = audioRef.current
    if (audioElement) {
      audioElement.addEventListener('timeupdate', updateProgress)
      return () => {
        audioElement.removeEventListener('timeupdate', updateProgress)
      }
    }
  }, [audioRef])

  const handleSeek = (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX } = event
    const { left, width } = event.currentTarget.getBoundingClientRect()
    const offsetX = clientX - left
    const newTime = (offsetX / width) * duration
    onSeek(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  return (
    <div className="w-full flex flex-col items-center my-2">
      <div
        className="hidden w-full h-2 bg-neutral-300 border border-neutral-400 rounded-lg cursor-pointer relative"
        onClick={handleSeek}
      >
        <div
          className="absolute h-full bg-neutral-500 rounded-lg"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
      </div>
      <input type="hidden" value={currentTime} />
    </div>
  )
}

export default ProgressBar
