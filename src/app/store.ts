import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../state/auth';
import { taskReducer } from '../state/task/slice';
import { commentReducer } from '../state/comment/slice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		task: taskReducer,
		comment: commentReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
