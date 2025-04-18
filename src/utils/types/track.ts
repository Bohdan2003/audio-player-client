export type TTrackData = {
  data: TTrack[],
  meta: {
    total: number,
    page: number,
    limit: number,
    totalPages: number
  }
}

export type TTrack = {
  id: string,
  title: string,
  artist: string,
  album: string,
  genres: string[],
  slug: string,
  coverImage: string,
  audioFile: string,
  createdAt: string,
  updatedAt: string
}