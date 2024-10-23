import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	CreateTaskListDTO,
	EditTaskListDTO,
	TaskListDTO,
} from '../../type/serverInterface/TaskListDTO';
import { api } from '../../app/api';

/**
 * Функция которая обрабатывает асинхронную задачу по получению списка.
 */
export const getListOfTaskListThunk = createAsyncThunk<TaskListDTO[]>(
	'getListOfTaskList',
	async () => {
		return await api.taskList.getListOfTaskList();
	}
);

/**
 * Функция для получения подробной информации о задачи
 */
export const getTaskListByIdThunk = createAsyncThunk<TaskListDTO, number>(
	'getTaskListById',
	async byId => {
		return await api.taskList.getTaskListById(byId);
	}
);

/**
 * функция для редактирования содержимого задачи
	@param  body - это объект с данными нужный для редактирования задачи
	@param taskId - это идентификатор id выбранной задачи
*/
export const editTaskThunk = createAsyncThunk<
	void,
	{ body: EditTaskListDTO; taskId: number }
>('editTask', async ({ body, taskId }) => {
	return await api.taskList.editTask(body, taskId);
});

/**
 * Функция для создания новой задачи. Внутри функции происходит вызов метода `createTask` от API
(`api.taskList.createTask(body, userId)`), который создает новую задачу на основе переданных
данных и возвращает результат создания.
	@returns body - это объект с данными для создания новой задачи (CreateTaskListDTO)
	@returns userId - идентификатор пользователя, который создает задачу
 */
export const createTaskThunk = createAsyncThunk<
	number,
	{ body: CreateTaskListDTO; userId: number }
>('createTask', async ({ body, userId }) => {
	return await api.taskList.createTask(body, userId);
});

/**
 * Функция для удаления задачи по id
	@param taskId - выбранный id для удаления задачи
 */
export const deleteTaskThunk = createAsyncThunk<void, number>(
	'deleteTask',
	async taskId => {
		return await api.taskList.deleteTask(taskId);
	}
);
