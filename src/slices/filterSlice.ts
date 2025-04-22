import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type TFilterState = {
  sort: string;
  order: string;
  search: string;
  genre: string
}

const initialState: TFilterState = {
  order: 'asc',
  sort: 'createdAt',
  search: '',
  genre: ''
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSortField: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<string>) => {
      state.order = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setGenre: (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
    }
  },
})

export const {
  setSortField,
  setSortOrder,
  setSearch,
  setGenre
} = filterSlice.actions


export default filterSlice.reducer