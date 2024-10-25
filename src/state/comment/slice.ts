import { createSlice } from '@reduxjs/toolkit';
import {
	getCommentByIdThunk,
	getListOfCommentByIdTaskListThunk,
} from './thunk';
import { CommentState } from './type';

const initialState: CommentState = {
	commentList: [],
	comment: null,
};

export const commentSlice = createSlice({
	name: 'comment',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(
			getListOfCommentByIdTaskListThunk.pending,
			(state, action) => {
				console.log(
					'Запрос начал выполнятся getListOfCommentByIdTaskListThunk'
				);
				state.comment = null;
			}
		);

		builder.addCase(
			getListOfCommentByIdTaskListThunk.rejected,
			(state, action) => {
				console.log(
					'запрос отвалился с ошибкой getListOfCommentByIdTaskListThunk'
				);
			}
		);

		builder.addCase(
			getListOfCommentByIdTaskListThunk.fulfilled,
			(state, action) => {
				console.log(
					'запрос выполнился успешно getListOfCommentByIdTaskListThunk'
				);
				state.commentList = action.payload;
			}
		);

		builder.addCase(getCommentByIdThunk.pending, (state, action) => {
			console.log('Запрос начал выполнятся getCommentById');
			state.comment = null;
		});

		builder.addCase(getCommentByIdThunk.rejected, (state, action) => {
			console.log('запрос отвалился с ошибкой getCommentById');
		});

		builder.addCase(getCommentByIdThunk.fulfilled, (state, action) => {
			console.log('запрос выполнился успешно getCommentById');
			state.comment = action.payload;
		});
	},
});

export const commentReducer = commentSlice.reducer;
