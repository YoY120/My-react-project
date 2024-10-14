import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	MainUserDataDTO,
	SignInUserDTO,
	SignUpUserDTO,
} from '../../type/serverInterface/user/userDTO';
import { api } from '../../app/api';

export const getUserDataThunk = createAsyncThunk<MainUserDataDTO>(
	'getUserData',
	async () => {
		return await api.auth.fetchMainUserData();
	}
);

export const signInThunk = createAsyncThunk<MainUserDataDTO, SignInUserDTO>(
	'signIn',
	async payload => {
		await api.auth.signIn(payload);
		return await api.auth.fetchMainUserData();
	}
);

export const signUpThunk = createAsyncThunk<void, SignUpUserDTO>(
	'signUp',
	async payload => {
		return await api.auth.signUp(payload);
	}
);
