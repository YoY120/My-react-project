import { getUserDataThunk, signInThunk, signUpThunk } from './thunk';
import { AppDispatch } from '../../app/store';
import {
	SignInUserDTO,
	SignUpUserDTO,
} from '../../type/serverInterface/user/userDTO';

export const getUserDataAction = () => (dispatch: AppDispatch) =>
	dispatch(getUserDataThunk());

export const signInAction = (data: SignInUserDTO) => (dispatch: AppDispatch) =>
	dispatch(signInThunk(data));

export const signUpAction = (data: SignUpUserDTO) => (dispatch: AppDispatch) =>
	dispatch(signUpThunk(data));
