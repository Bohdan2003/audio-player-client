import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
//types
import { TTracksData } from "../utils/types/track.ts";
import { TTrackFormValues} from "../utils/types/track.ts";

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/' }),
  tagTypes: [ 'Tracks' ],
  endpoints: (builder) => ({
    getGenres: builder.query<string[], null>({
      query: () => 'genres',
    }),
    getTracks: builder.query<TTracksData, {
      sort: string;
      order: string;
      page: number;
      search?: string;
      genre?: string;
    }>({
      query: ({sort, order, page, search, genre}) => `tracks?sort=${sort}&order=${order}&page=${encodeURIComponent(page)}${search ? `&search=${encodeURIComponent(search)}` : '' }${genre ? `&genre=${encodeURIComponent(genre)}` : '' }`,
      providesTags: ['Tracks']
    }),
    deleteTrack: builder.mutation<null, string>({
      query: (id) => ({
        url: `tracks/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Tracks']
    }),
    createTrack: builder.mutation<void, Partial<TTrackFormValues>>({
      query: track => ({
        url: 'tracks',
        method: 'POST',
        body: track
      }),
      invalidatesTags: ['Tracks']
    }),
    editTrack: builder.mutation<void, {id: string, track: Partial<TTrackFormValues>}>({
      query: ({id, track}) => ({
        url: `tracks/${id}`,
        method: 'PUT',
        body: track
      }),
      invalidatesTags: ['Tracks']
    }),
    uploadTrack: builder.mutation<null, {id: string, file: File}>({
      query: ({ id, file }) => {
        const formData = new FormData();
        formData.append('file', file);

        return {
          url: `tracks/${id}/upload`,
          method: 'POST',
          body: formData,
        };
      },
    }),
  }),
})

export const {
  useGetGenresQuery,
  useGetTracksQuery,
  useDeleteTrackMutation,
  useCreateTrackMutation,
  useEditTrackMutation,
  useUploadTrackMutation,
} = api