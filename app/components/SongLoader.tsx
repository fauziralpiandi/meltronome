import { useEffect } from 'react'
import { Song } from '../lib/Song'
import LoadingScreen from './LoadingScreen'
import { gist } from '../lib/gist'

interface SongLoaderProps {
  setSongs: (songs: Song[]) => void
  setLoading: (loading: boolean) => void
}

const SongLoader = ({ setSongs, setLoading }: SongLoaderProps) => {
  useEffect(() => {
    const fetchSongs = async () => {
      const storedSongs = localStorage.getItem('songs')
      if (storedSongs) {
        setSongs(JSON.parse(storedSongs))
        setLoading(false)
        return
      }

      try {
        const response = await fetch(gist.url)
        if (!response.ok) throw new Error('Network response was not ok')

        const data = await response.json()

        const songs = data.songs.map((song: Song) => ({
          ...song,
          files: {
            song: song.files.song,
            cover: song.files.cover,
          },
        }))

        setSongs(songs)
        localStorage.setItem('songs', JSON.stringify(songs))
        setLoading(false)
      } catch (error) {
        console.error('Error fetching songs:', error)
        setLoading(false)
      }
    }

    fetchSongs()
  }, [setSongs, setLoading])

  return <LoadingScreen message="Wait a minute..." />
}

export default SongLoader
