import { createAsyncThunk } from "@reduxjs/toolkit";
import { CommentDTO } from "../../type/serverInterface/CommentDTO";
import { api } from "../../app/api";

/**
 * Функция, которая обрабатывает асинхронную задачу по получению списка.
 */
export const getListOfCommentByIdTaskListThunk = createAsyncThunk<
	CommentDTO[],
	{ taskId: number }
>('getListOfCommentByIdTaskList', async ({ taskId }) => {
	return await api.comment.getListOfCommentByIdTaskList(taskId);
});
