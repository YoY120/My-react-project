import { CommentDTO } from '../../type/serverInterface/CommentDTO';

export type CommentState = {
	commentList: CommentDTO[];
	comment: CommentDTO | null;
};
