import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type TFilterState = {
  audioFile?: string | null;
}

const initialState: TFilterState = {
  audioFile: null,
}

export const audioPlayerSlice = createSlice({
  name: 'audioPlayer',
  initialState,
  reducers: {
    setAudioPlayerUrl: (state, action: PayloadAction<TFilterState['audioFile']>) => {
      state.audioFile = action.payload;
    },
  },
})

export const {
  setAudioPlayerUrl
} = audioPlayerSlice.actions


export default audioPlayerSlice.reducer