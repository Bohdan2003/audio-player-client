import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type TFilterState = {
  audioFile?: string | null;
  id?: string | null;
}

const initialState: TFilterState = {
  audioFile: null,
}

export const audioPlayerSlice = createSlice({
  name: 'audioPlayer',
  initialState,
  reducers: {
    setActiveAudio: (state, action: PayloadAction<{
      id: string;
      audioFile: string;
    }>) => {
      state.audioFile = action.payload.audioFile;
      state.id = action.payload.id;
    },
  },
})

export const {
  setActiveAudio
} = audioPlayerSlice.actions


export default audioPlayerSlice.reducer