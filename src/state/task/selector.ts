import { RootState } from '../../app/store';

export const selectListOfTaskList = () => (state: RootState) =>
	state.task.taskList;

export const selectTask = () => (state: RootState) => state.task.task