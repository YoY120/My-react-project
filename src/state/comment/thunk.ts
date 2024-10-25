import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	CommentDTO,
	CreateCommentDTO,
} from '../../type/serverInterface/CommentDTO';
import { api } from '../../app/api';

/**
 * Функция, которая обрабатывает асинхронную задачу по получению списка.
 */
export const getListOfCommentByIdTaskListThunk = createAsyncThunk<
	CommentDTO[],
	{ taskId: number }
>('getListOfCommentByIdTaskList', async ({ taskId }) => {
	return await api.comment.getListOfCommentByIdTaskList(taskId);
});

/**
 * Функция для получения подробной информации о комментарии
 */
export const getCommentByIdThunk = createAsyncThunk<CommentDTO, number>(
	'getCommentById',
	async commentId => {
		return await api.comment.getCommentById(commentId);
	}
);

/**
 * Функция для создания нового комментария
 */
export const createCommentThunk = createAsyncThunk<
	number,
	{ body: CreateCommentDTO; userId: number; taskListId: number }
>('createComment', async ({ body, userId, taskListId }) => {
	return await api.comment.createComment(body, userId, taskListId);
});
