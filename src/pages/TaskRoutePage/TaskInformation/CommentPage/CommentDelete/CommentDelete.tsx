import React, { FC, useState } from 'react';
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

/**
 * Удаление комментария
 */
const CommentDelete: FC<CommentDeleteId> = ({
	isTaskId,
	isDeleteComment,
	onClose,
}) => {
	const dispatch = useAppDispatch();

	const [isLoading, setIsLoading] = useState(false);

	const handDeleteTaskClick = () => {
		if (isDeleteComment && isTaskId && !isLoading) {
			setIsLoading(true);
			dispatch(deleteCommentThunk(isDeleteComment)).then(() => {
				dispatch(
					getListOfCommentByIdTaskListThunk({ taskId: isTaskId })
				).finally(() => {
					setIsLoading(false);
				});
				onClose();
			});
		}
	};

	const renderWarningText = () => {
		return (
			<div className={style.commentDelete_Content_WarningText}>
				<Text size='2xl' view='primary'>
					Вы точно хотите удалить комментарий?
				</Text>
				<Text size='s' view='link'>
					Удаляться все данные, которые содержал в себе комментарий.
				</Text>
			</div>
		);
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

	return (
		<Modal
			isOpen={Boolean(isDeleteComment)}
			hasOverlay
			onClickOutside={onClose}
			className={style.commentDelete}
		>
			<div className={style.commentDelete_Content}>
				{renderWarningText()}
				{renderMenu()}
			</div>
		</Modal>
	);
};

export default CommentDelete;
