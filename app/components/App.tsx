'use client'

import { useState } from 'react'
import { Song } from '../lib/Song'
import SongLoader from './SongLoader'
import SongInfo from './SongInfo'
import SongList from './SongList'
import SongPlayer from './SongPlayer'

const MusicPlayer = () => {
  const [songs, setSongs] = useState<Song[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [loading, setLoading] = useState(true)

  const currentSong = songs[currentIndex]

  const handleSelectSong = (index: number) => {
    if (currentIndex !== index) {
      setCurrentIndex(index)
      setIsPlaying(true)
    } else {
      setIsPlaying((prev) => !prev)
    }
  }

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(event.target.value)
    const audio = document.querySelector(
      `audio[src="${currentSong?.files.song}"]`,
    ) as HTMLAudioElement
    if (audio) {
      audio.currentTime = newTime
    }
  }

  return (
    <div className="flex flex-col items-center p-4">
      {loading ? (
        <SongLoader setSongs={setSongs} setLoading={setLoading} />
      ) : (
        <>
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
          />
        </>
      )}
    </div>
  )
}

export default MusicPlayer
