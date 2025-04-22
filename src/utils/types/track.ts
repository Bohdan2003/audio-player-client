import { TPagination } from "./pagination.ts";

export type TTracksData = {
  data: TTrack[],
  meta: TPagination
}

export type TTrack = {
  id: string,
  title: string,
  artist: string,
  album: string,
  genres: string[],
  slug: string,
  coverImage: string,
  audioFile?: string,
  createdAt: string,
  updatedAt: string
}

export type TTrackFormValues = {
  title: string,
  artist: string,
  album: string,
  genres: string[],
  coverImage: string
}