import React from 'react'
import Image from 'next/image'
import { Song } from '../lib/Song'

interface SongImageProps {
  src: string
  alt: string
  isPlaying: boolean
  currentIndex: number
  index: number
}

const SongImage = ({
  src,
  alt,
  isPlaying,
  currentIndex,
  index,
}: SongImageProps) => {
  const imageClasses = `object-cover scale-105 transition-all duration-500 ease-in-out ${
    currentIndex === index
      ? isPlaying
        ? 'opacity-100'
        : 'opacity-100 grayscale'
      : 'opacity-75 grayscale'
  }`

  return (
    <Image
      src={src}
      alt={alt}
      width={640}
      height={640}
      className={imageClasses}
      priority
    />
  )
}

const SongListItem = ({
  song,
  index,
  currentIndex,
  onSelectSong,
  isPlaying,
}: {
  song: Song
  index: number
  currentIndex: number
  onSelectSong: (index: number) => void
  isPlaying: boolean
}) => {
  const isSelected = currentIndex === index
  const imageClasses = `absolute inset-0 transition-all duration-500 ease-in-out ${
    isSelected ? 'blur-sm' : 'blur-md group-hover:blur-sm'
  }`

  return (
    <div
      className={`relative flex items-center p-3 cursor-pointer rounded-lg border border-neutral-400 overflow-hidden group transition-all duration-500 ${
        isSelected ? '' : 'hover:bg-neutral-300'
      }`}
      onClick={() => onSelectSong(index)}
    >
      <div className="absolute inset-0 z-0 rounded-lg overflow-hidden">
        <div className={imageClasses}>
          <SongImage
            src={song.files.cover}
            alt={song.songName}
            isPlaying={isPlaying}
            currentIndex={currentIndex}
            index={index}
          />
        </div>
        <div
          className={`absolute inset-0 bg-white transition-all duration-500 ease-in-out opacity-50 ${
            !isSelected ? 'group-hover:opacity-25' : ''
          }`}
        />
      </div>

      <div className="relative z-10 flex items-center">
        <div className="relative w-12 h-12 mr-3 ml-0.5 overflow-hidden rounded-lg shadow-lg">
          <SongImage
            src={song.files.cover}
            alt={song.songName}
            isPlaying={isPlaying}
            currentIndex={currentIndex}
            index={index}
          />
        </div>
        <div className="z-30 flex flex-col">
          <span className="font-bold text-neutral-800 leading-snug">
            {song.songName}
          </span>
          <span className="font-medium text-xs text-neutral-600">
            {song.artist}
          </span>
        </div>
      </div>
    </div>
  )
}

const SongList = ({
  songs,
  currentIndex,
  onSelectSong,
  isPlaying,
}: {
  songs: Song[]
  currentIndex: number
  onSelectSong: (index: number) => void
  isPlaying: boolean
}) => (
  <div className="w-full space-y-2 overflow-y-scroll hidden-scrollbar rounded-lg max-h-[240px]">
    {songs.map((song, index) => (
      <SongListItem
        key={index}
        song={song}
        index={index}
        currentIndex={currentIndex}
        onSelectSong={onSelectSong}
        isPlaying={isPlaying}
      />
    ))}
  </div>
)

export default SongList
