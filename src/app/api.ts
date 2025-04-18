import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
//types
import { TTrackData } from "../utils/types/track.ts";

export const api = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:300/api/' }),
  endpoints: (builder) => ({
    getGenres: builder.query<string, string>({
      query: () => 'genres',
    }),
    getTracks: builder.query<TTrackData, {
      sort: 'title' | 'artlist' | 'album' | 'createdAt',
      order: 'asc' | 'desc'
    }>({
      query: ({sort, order}) => `tracks?sort=${sort}&order=${order}`,
    })
  }),
})

export const { useGetGenresQuery } = api