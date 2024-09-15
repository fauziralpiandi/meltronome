// components/SongList.tsx
import React from 'react'
import { Song } from '../lib/Song'

const SongList = ({
  songs,
  currentIndex,
  onSelectSong,
}: {
  songs: Song[]
  currentIndex: number
  onSelectSong: (index: number) => void
}) => (
  <div className="space-y-2 overflow-y-scroll max-h-40">
    {songs.map((song, index) => (
      <div
        key={index}
        className={`flex items-center p-2 cursor-pointer border rounded-lg transition-colors duration-200 ${currentIndex === index ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
        onClick={() => onSelectSong(index)}
      >
        <div className="relative w-10 h-10 overflow-hidden rounded-lg mr-2">
          <img
            src={song.files.cover}
            alt={song.songName}
            className={`object-cover w-full h-full transition-opacity duration-500 ease-in-out ${currentIndex === index ? 'opacity-100' : 'opacity-75'}`}
          />
        </div>
        <div className="flex flex-col truncate">
          <h3 className="text-xs font-bold truncate">{song.songName}</h3>
          <p className="text-xs text-gray-500 truncate">{song.artist}</p>
        </div>
      </div>
    ))}
  </div>
)

export default SongList
