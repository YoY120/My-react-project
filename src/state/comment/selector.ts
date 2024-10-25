import { RootState } from '../../app/store';

export const selectorListOfCommentList = () => (state: RootState) =>
	state.comment.commentList;

export const selectComment = () => (state: RootState) => state.comment.comment;
