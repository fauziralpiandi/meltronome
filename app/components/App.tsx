'use client'

import { useState, useEffect, useRef } from 'react'

import { Meltronome } from 'app/lib/types'

import Load from 'app/components/Load'
import Canvas from 'app/components/Canvas'
import Player from 'app/components/Player'
import List from 'app/components/List'

const App = ({ onCoverChange }: { onCoverChange: (cover: string) => void }) => {
  const [tracks, setTrack] = useState<Meltronome[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isContentVisible, setIsContentVisible] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const currentTrack = tracks[currentIndex]

  useEffect(() => {
    if (currentTrack) {
      onCoverChange(currentTrack.colorCover)
    }
  }, [currentTrack, onCoverChange])

  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play()
        } catch (error) {
          console.error('Error playing audio:', error)
        }
      }
    }

    if (isPlaying) {
      playAudio()
    } else {
      audioRef.current?.pause()
    }
  }, [isPlaying, currentTrack])

  const handleSelectTrack = (index: number) => {
    if (currentIndex !== index) {
      setCurrentIndex(index)
      setIsPlaying(true)
    } else {
      setIsPlaying((prev) => !prev)
    }
  }

  useEffect(() => {
    if (!loading) {
      setIsContentVisible(true)
    }
  }, [loading])

  return (
    <div className="w-full flex flex-col items-center p-12">
      {loading ? (
        <Load setTrack={setTrack} setLoading={setLoading} />
      ) : (
        <div
          className={`w-full ${isContentVisible ? 'animate-in' : 'opacity-0'}`}
        >
          <audio ref={audioRef} src={currentTrack?.url} preload="metadata" />
          <Canvas track={currentTrack} isPlaying={isPlaying} />
          <Player currentTrack={currentTrack} isPlaying={isPlaying} />
          <List
            tracks={tracks}
            currentIndex={currentIndex}
            onSelectTrack={handleSelectTrack}
            isPlaying={isPlaying}
          />
        </div>
      )}
    </div>
  )
}

export default App
