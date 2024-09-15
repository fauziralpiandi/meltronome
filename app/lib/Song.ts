// components/Song.ts
export interface Song {
  bg: string
  artist: string
  songName: string
  files: {
    song: string
    cover: string
  }
}
