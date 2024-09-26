import React, { useMemo } from 'react'
import Image from 'next/image'

import { Song } from '../lib/Song'

interface SongInfoProps {
  song: Song
  isPlaying: boolean
}

const ImageSizeClass = (size: 'large' | 'small', isPlaying: boolean) =>
  size === 'large'
    ? isPlaying
      ? 'grayscale-0 scale-100'
      : 'grayscale scale-110'
    : isPlaying
      ? 'grayscale-0 scale-110'
      : 'grayscale scale-100'

const SongImage = ({
  src,
  alt,
  isPlaying,
  size = 'small',
  blurEffect = false,
}: {
  src: string
  alt: string
  isPlaying: boolean
  size?: 'large' | 'small'
  blurEffect?: boolean
}) => {
  const imageClasses = useMemo(
    () =>
      `object-cover transform transition-all duration-500 ease-in-out ${ImageSizeClass(
        size,
        isPlaying,
      )}`,
    [size, isPlaying],
  )

  return (
    <Image
      src={src}
      alt={alt}
      width={640}
      height={640}
      className={`${imageClasses} ${blurEffect ? 'blur-md opacity-75' : ''}`}
      priority
    />
  )
}

const SongText = ({
  songName,
  artist,
}: {
  songName: string
  artist: string
}) => (
  <div className="z-30 text-center">
    <span className="block font-bold text-lg text-neutral-800 leading-none">
      {songName}
    </span>
    <span className="text-sm font-medium text-neutral-600">{artist}</span>
  </div>
)

const SongInfo = ({ song, isPlaying }: SongInfoProps) => (
  <div className="relative mb-3 flex flex-col items-center w-full p-6 overflow-hidden border border-neutral-400 rounded-lg">
    <div className="absolute inset-0 z-0">
      <div className="relative w-full h-full overflow-hidden rounded-lg">
        <SongImage
          src={song.files.cover}
          alt={song.songName}
          isPlaying={isPlaying}
          size="large"
          blurEffect
        />
        <div className="absolute inset-0 z-10 bg-white opacity-25" />
      </div>
    </div>

    <div className="relative z-10 w-28 h-28 mb-4 overflow-hidden rounded-lg shadow-lg">
      <SongImage
        src={song.files.cover}
        alt={song.songName}
        isPlaying={isPlaying}
      />
    </div>

    <SongText songName={song.songName} artist={song.artist} />
  </div>
)

export default SongInfo
