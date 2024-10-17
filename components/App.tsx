'use client'

import { useState, useEffect, useRef } from 'react'

import { Meltronome } from '~/types.d'
import Load from '~/Load'
import Canvas from '~/Canvas'
import Player from '~/Player'
import List from '~/List'

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
    <div className="w-full flex flex-col items-center p-14">
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
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
            <div className="font-semibold text-sm text-mono-800 tracking-tight">
              &copy; {new Date().getFullYear()} Meltronome &mdash; Fauzira Alpiandi
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
