import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ConfigState {
  timeliveUrl: string;
  quickbooksAuth: string;
}

const initialState: ConfigState = {
  timeliveUrl: '',
  quickbooksAuth: '',
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setConfig(state, action: PayloadAction<ConfigState>) {
      state.timeliveUrl = action.payload.timeliveUrl;
      state.quickbooksAuth = action.payload.quickbooksAuth;
    },
  },
});

export const { setConfig } = configSlice.actions;
export default configSlice.reducer;
