import { useEffect, useRef } from 'react'
import { Song } from '../lib/Song'
// import ProgressBar from './ProgressBar'

interface SongPlayerProps {
  currentSong: Song | null
  isPlaying: boolean
}

const SongPlayer = ({ currentSong, isPlaying }: SongPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (audio && currentSong) {
      isPlaying ? audio.play() : audio.pause()
    }
  }, [isPlaying, currentSong])

  return (
    <>
      {currentSong && (
        <>
          <audio ref={audioRef} src={currentSong.files.song} />
        </>
      )}
    </>
  )
}

export default SongPlayer
