'use client'

import { useState, useEffect, useRef } from 'react'
import { Song } from '../lib/Song'

import SongLoader from './SongLoader'
import SongInfo from './SongInfo'
import SongList from './SongList'
import SongPlayer from './SongPlayer'

const MusicPlayer = ({
  onCoverChange,
}: {
  onCoverChange: (cover: string) => void
}) => {
  const [songs, setSongs] = useState<Song[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isContentVisible, setIsContentVisible] = useState(false) // state baru untuk kontrol animasi

  const audioRef = useRef<HTMLAudioElement | null>(null)

  const currentSong = songs[currentIndex]

  useEffect(() => {
    if (currentSong) {
      onCoverChange(currentSong.bg)
    }
  }, [currentSong, onCoverChange])

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying])

  const handleSelectSong = (index: number) => {
    if (currentIndex !== index) {
      setCurrentIndex(index)
      setIsPlaying(true)
    } else {
      setIsPlaying((prev) => !prev)
    }
  }

  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
    }
  }

  useEffect(() => {
    if (!loading) {
      setTimeout(() => setIsContentVisible(true), 100)
    }
  }, [loading])

  return (
    <div className="w-full flex flex-col items-center p-12">
      {loading ? (
        <SongLoader setSongs={setSongs} setLoading={setLoading} />
      ) : (
        <div
          className={`w-full ${isContentVisible ? 'animate-in' : 'opacity-0'}`}
        >
          <audio ref={audioRef} src={currentSong?.url} preload="metadata" />
          <SongInfo song={currentSong} isPlaying={isPlaying} />
          <SongPlayer
            currentSong={currentSong}
            isPlaying={isPlaying}
            onSeek={handleSeek}
          />
          <SongList
            songs={songs}
            currentIndex={currentIndex}
            onSelectSong={handleSelectSong}
            isPlaying={isPlaying}
          />
        </div>
      )}
    </div>
  )
}

export default MusicPlayer
