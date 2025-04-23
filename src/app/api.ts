import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//types
import { TTracksData } from "../utils/types/track.ts";
import { TTrackFields } from "../utils/types/track.ts";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
  tagTypes: ["Tracks"],
  endpoints: (builder) => ({
    getGenres: builder.query<string[], null>({
      query: () => "genres",
    }),
    getTracks: builder.query<
      TTracksData,
      {
        sort: string;
        order: string;
        page: number;
        search?: string;
        genre?: string;
      }
    >({
      query: ({ sort, order, page, search, genre }) => {
        const encodedSearchParam = search
          ? `&search=${encodeURIComponent(search)}`
          : "";
        const encodedGenreParam = genre
          ? `&genre=${encodeURIComponent(genre)}`
          : "";
        const encodedPageParam = page
          ? `&page=${encodeURIComponent(page)}`
          : "";

        return `tracks?sort=${sort}&order=${order}${encodedPageParam}${encodedSearchParam}${encodedGenreParam}`;
      },
      providesTags: ["Tracks"],
    }),
    deleteTrack: builder.mutation<null, string>({
      query: (id) => ({
        url: `tracks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tracks"],
    }),
    createTrack: builder.mutation<void, TTrackFields>({
      query: (track) => ({
        url: "tracks",
        method: "POST",
        body: track,
      }),
      invalidatesTags: ["Tracks"],
    }),
    editTrack: builder.mutation<void, { id: string; track: TTrackFields }>({
      query: ({ id, track }) => ({
        url: `tracks/${id}`,
        method: "PUT",
        body: track,
      }),
      async onQueryStarted({ id, track }, { dispatch, queryFulfilled, getState }) {
        const state = getState();
        const patchResults = [];
        const allTracksQueries = api.util.selectInvalidatedBy(state, [{ type: "Tracks" }]);

        for (const key in allTracksQueries) {
          const args = allTracksQueries[key].originalArgs;

          const patchResult = dispatch(
            api.util.updateQueryData("getTracks", args, (draft) => {
              const index = draft.data.findIndex((t) => t.id === id);
              if (index !== -1) {
                Object.assign(draft.data[index], track);
              }
            })
          );

          patchResults.push(patchResult);
        }

        try {
          await queryFulfilled
        } catch {
          patchResults.forEach(p => p.undo());
        }
      },
    }),
    uploadTrack: builder.mutation<null, { id: string; file: FormData }>({
      query: ({ id, file }) => ({
        url: `tracks/${id}/upload`,
        method: "POST",
        body: file,
      }),
      invalidatesTags: ["Tracks"],
    }),
    unloadTrack: builder.mutation<null, string>({
      query: (id) => ({
        url: `tracks/${id}/file`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tracks"],
    }),
  }),
});

export const {
  useGetGenresQuery,
  useGetTracksQuery,
  useDeleteTrackMutation,
  useCreateTrackMutation,
  useEditTrackMutation,
  useUploadTrackMutation,
  useUnloadTrackMutation,
} = api;
