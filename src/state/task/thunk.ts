import { createAsyncThunk } from '@reduxjs/toolkit';
import { TaskListDTO } from '../../type/serverInterface/TaskListDTO';
import { api } from '../../app/api';

export const getListOfTaskListThunk = createAsyncThunk<TaskListDTO[]>(
	'getListOfTaskList',
	async () => {
		return await api.taskList.getListOfTaskList();
	}
);
