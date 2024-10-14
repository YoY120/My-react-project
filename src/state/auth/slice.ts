import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {getUserDataThunk, signInThunk } from "./thunk";
import { MainUserDataDTO } from '../../type/serverInterface/user/userDTO';
import { api } from '../../app/api';

export interface AuthState {
  user: MainUserDataDTO | null,
  isAuth: boolean,
  isInitReqExecute: boolean,
}

const initialState: AuthState = {
  user: null,
  isAuth: false,
  isInitReqExecute: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
      api.clearTokens();
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUserDataThunk.fulfilled, (state: AuthState, action: PayloadAction<MainUserDataDTO>) => {
      state.user = action.payload;
      state.isInitReqExecute = true;
      state.isAuth = true;
    });
    
    builder.addCase(signInThunk.fulfilled, (state: AuthState, action: PayloadAction<MainUserDataDTO>) => {
      state.user = action.payload;
      state.isInitReqExecute = true;
      state.isAuth = true;
    });

    builder.addCase(getUserDataThunk.rejected, (state, action) => {
      state.isInitReqExecute = true;
    });
  }
})

export const { logout } = authSlice.actions;

export const authReducer = authSlice.reducer;