import { useEffect, useState } from 'react'
import { Song } from '../lib/Song'
import LoadingScreen from './LoadingScreen'
import { gist } from '../lib/gist'

interface SongLoaderProps {
  setSongs: (songs: Song[]) => void
  setLoading: (loading: boolean) => void
}

const SongLoader = ({ setSongs, setLoading }: SongLoaderProps) => {
  const [downloadProgress, setDownloadProgress] = useState(0)

  useEffect(() => {
    let progressInterval: NodeJS.Timeout | null = null

    const fetchBlob = async (url: string) => {
      const response = await fetch(url)
      if (!response.ok) throw new Error(`Failed to fetch ${url}`)
      const blob = await response.blob()
      return URL.createObjectURL(blob)
    }

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
        const totalSongs = data.songs.length

        setDownloadProgress(0)

        let songsLoaded = 0
        const updateProgress = () => {
          songsLoaded += 1
          setDownloadProgress((songsLoaded / totalSongs) * 100)
        }

        const songPromises = data.songs.map(async (song: Song) => {
          try {
            // Ganti URL dengan Blob URL untuk audio dan cover agar sumber asli tidak terlihat
            song.files.song = await fetchBlob(song.files.song)
            if (song.files.cover)
              song.files.cover = await fetchBlob(song.files.cover)
            updateProgress()
          } catch (error) {
            console.error(`Error loading ${song.songName}:`, error)
            updateProgress()
          }
        })

        await Promise.all(songPromises)

        setSongs(data.songs)
        localStorage.setItem('songs', JSON.stringify(data.songs))
        setLoading(false)
      } catch (error) {
        console.error('Error fetching songs:', error)
        setLoading(false)
      }
    }

    fetchSongs()

    return () => {
      if (progressInterval) clearInterval(progressInterval)
      // Bersihkan Blob URL setelah tidak digunakan untuk mencegah memory leak
      const storedSongs = localStorage.getItem('songs')
      if (storedSongs) {
        const songs = JSON.parse(storedSongs) as Song[]
        songs.forEach((song) => {
          URL.revokeObjectURL(song.files.song)
          if (song.files.cover) URL.revokeObjectURL(song.files.cover)
        })
      }
    }
  }, [setSongs, setLoading])

  return <LoadingScreen progress={downloadProgress} />
}

export default SongLoader
