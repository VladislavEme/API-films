import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  loginName: string | null;
}

const initialState: AuthState = {
  loginName: localStorage.getItem('login'),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginName: (state, action: PayloadAction<string | null>) => {
      state.loginName = action.payload;
    },
  },
});

export const { setLoginName } = authSlice.actions;
export default authSlice.reducer;
