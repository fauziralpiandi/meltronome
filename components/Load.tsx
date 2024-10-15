import React, { useEffect, useState } from 'react'
import { FaSpinner } from 'react-icons/fa'

import { Meltronome } from '~/types.d'

interface LoaderProps {
  setTrack: (meltronome: Meltronome[]) => void
  setLoading: (loading: boolean) => void
}

const useFetchMeltronome = (
  setTrack: (meltronome: Meltronome[]) => void,
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void,
) => {
  useEffect(() => {
    const fetchMeltronome = async () => {
      try {
        let response = await fetch('/meltronome.json')
        if (!response.ok) throw new Error('Network response was not ok')

        let data = await response.json()
        let meltronome: Meltronome[] = data.meltronome.map(
          (meltronome: Meltronome) => ({
            ...meltronome,
            play: {
              track: meltronome.play.track,
              artwork: meltronome.play.artwork,
            },
          }),
        )

        setTrack(meltronome)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching meltronome:', err)
        setError('Failed to load meltronome data.')
        setLoading(false)
      }
    }

    fetchMeltronome()
  }, [setTrack, setLoading, setError])
}

const Loading = ({ message }: { message?: string }) => (
  <div className="flex flex-col items-center justify-center h-screen">
    <div className="flex items-center text-center animate-pulse mb-2">
      <div className="loader" />
      <span className="mr-2 font-semibold text-xl">Loading</span>
      <FaSpinner className="animate-spin text-xl" />
    </div>
    <div className="text-center text-sm text-mono-500">{message}</div>
  </div>
)

const Loader = ({ setTrack, setLoading }: LoaderProps) => {
  const [error, setError] = useState<string | null>(null)

  useFetchMeltronome(setTrack, setLoading, setError)

  return <Loading message={error || 'Wait a minute...'} />
}

export default Loader
