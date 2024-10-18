import { createSlice } from '@reduxjs/toolkit';
import { TaskState } from './type';
import { getListOfTaskListThunk } from './thunk';

const initialState: TaskState = {
	taskList: [],
	task: null,
};

export const taskSlice = createSlice({
	name: 'task',
	initialState,
	reducers: {},
	extraReducers: builder => {
		// getListOfTaskListThunk
		builder.addCase(getListOfTaskListThunk.pending, (state, action) => {
			console.log('Запрос начал выполнятся getListOfTaskListThunk');
		});

		builder.addCase(getListOfTaskListThunk.rejected, (state, action) => {
			console.log('запрос отвалился с ошибкой getListOfTaskListThunk');
		});

		builder.addCase(getListOfTaskListThunk.fulfilled, (state, action) => {
			console.log('запрос выполнился успешно getListOfTaskListThunk');
			state.taskList = action.payload;
		});
	},
});

export const taskReducer = taskSlice.reducer;
