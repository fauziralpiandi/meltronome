import { useEffect, useRef } from 'react'

import { Meltronome } from '~/types.d'

interface PlayerProps {
  currentTrack: Meltronome | null
  isPlaying: boolean
}

const Player = ({ currentTrack, isPlaying }: PlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (audio && currentTrack) {
      isPlaying ? audio.play() : audio.pause()
    }
  }, [isPlaying, currentTrack])

  return (
    <>
      {currentTrack && (
        <>
          <audio ref={audioRef} src={currentTrack.play.track} />
        </>
      )}
    </>
  )
}

export default Player
