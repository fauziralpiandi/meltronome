// components/SongInfo.tsx
import React from 'react'
import { Song } from '../lib/Song'

const SongInfo = ({ song, isPlaying }: { song: Song; isPlaying: boolean }) => (
  <div className="w-full flex flex-col items-center p-4 bg-gray-200 rounded-lg shadow-lg transition duration-300 ease-in-out">
    <div className="relative w-24 h-24 overflow-hidden rounded-lg mb-2">
      <img
        src={song.files.cover}
        alt={song.songName}
        className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-500 ease-in-out ${isPlaying ? 'opacity-100' : 'opacity-50'}`}
      />
    </div>
    <h3 className="text-sm font-bold text-center truncate">{song.songName}</h3>
    <p className="text-xs text-gray-600 text-center truncate">{song.artist}</p>
  </div>
)

export default SongInfo
