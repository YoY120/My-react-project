import { RootState } from '../../app/store';

export const selectorListOfCommentList = () => (state: RootState) =>
	state.comment.commentList;

export const selectTask = () => (state: RootState) => state.task.task;
