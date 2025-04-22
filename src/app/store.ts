import { configureStore } from '@reduxjs/toolkit';
import { api } from './api.ts';
import filterReducer from "../slices/filterSlice.ts"

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
