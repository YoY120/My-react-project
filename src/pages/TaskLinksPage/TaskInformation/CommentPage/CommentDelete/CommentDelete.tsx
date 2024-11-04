import React, { FC } from 'react';
import { CommentDeleteId } from './type';
import { useAppDispatch } from '../../../../../app/hooks/store';
import style from './CommentDelete.module.scss';
import { Button } from '@consta/uikit/Button';
import { IconTrash } from '@consta/icons/IconTrash';
import { IconClose } from '@consta/icons/IconClose';
import { Modal } from '@consta/uikit/Modal';
import { Text } from '@consta/uikit/Text';
import {
	deleteCommentThunk,
	getListOfCommentByIdTaskListThunk,
} from '../../../../../state/comment/thunk';

const CommentDelete: FC<CommentDeleteId> = ({
	isTaskId,
	isDeleteComment,
	onClose,
}) => {
	const dispatch = useAppDispatch();

	const handDeleteTaskClick = () => {
		isDeleteComment &&
			isTaskId &&
			dispatch(deleteCommentThunk(isDeleteComment)).then(() => {
				dispatch(getListOfCommentByIdTaskListThunk({ taskId: isTaskId }));
				onClose();
			});
	};

	const renderMenu = () => {
		return (
			<div className={style.commentDelete_Content_Menu}>
				<Button
					label='Все равно удалить'
					iconLeft={IconTrash}
					view='clear'
					onClick={handDeleteTaskClick}
				/>
				<Button
					label='Отменить'
					view='clear'
					iconRight={IconClose}
					onClick={onClose}
				/>
			</div>
		);
	};

	const renderContent = () => {
		return (
			<div className={style.commentDelete_Content}>
				<Text size='2xl' view='primary'>
					Вы точно хотите удалить комментарий?
				</Text>
				<Text size='s' view='ghost'>
					Удаляться все данные, которые содержал в себе комментарий.
				</Text>
				{renderMenu()}
			</div>
		);
	};

	return (
		<Modal
			isOpen={Boolean(isDeleteComment)}
			hasOverlay
			onClickOutside={onClose}
			className={style.commentDelete}
		>
			{renderContent()}
		</Modal>
	);
};

export default CommentDelete;
