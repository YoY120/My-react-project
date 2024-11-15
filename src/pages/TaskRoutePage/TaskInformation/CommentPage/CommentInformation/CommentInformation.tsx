import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks/store';
import { selectComment } from '../../../../../state/comment/selector';
import { getCommentByIdThunk } from '../../../../../state/comment/thunk';
import { Text } from '@consta/uikit/Text';
import style from './commentInformation.module.scss';
import { IconClose } from '@consta/icons/IconClose';
import { Button } from '@consta/uikit/Button';
import { IconEdit } from '@consta/icons/IconEdit';

/**
 * Экран информации комментария
 */
const CommentInformation = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const commentInfo = useAppSelector(selectComment());
	

	const { commentId, TaskId } = useParams<{
		commentId: string;
		TaskId: string;
	}>();
	const formattedCommentId = Number(commentId);
	const formattedTaskId = Number(TaskId);

	useEffect(() => {
		formattedCommentId && dispatch(getCommentByIdThunk(formattedCommentId));
	}, [dispatch, formattedCommentId]);

	const handleEditClick = () => {
		navigate(
			`/taskInformation/${formattedTaskId}/commentEdit/${formattedCommentId}`
		);
	};

	const renderHeaderMenu = () => {
		return (
			<div className={style.commentInformation_Header_Menu}>
				<Button
					onlyIcon
					view='ghost'
					iconRight={IconEdit}
					onClick={handleEditClick}
				/>
				<Button
					onlyIcon
					view='ghost'
					iconRight={IconClose}
					onClick={() => navigate(`/taskInformation/${formattedTaskId}`)}
				/>
			</div>
		);
	};

	const renderHeader = () => {
		return (
			<div className={style.commentInformation_Header}>
				<Text size='l' view='primary'>
					Подробная информация о комментарии c id №{commentInfo?.id}:
				</Text>
				{renderHeaderMenu()}
			</div>
		);
	};

	const renderContent = () => {
		return (
			<div className={style.commentInformation_Content}>
				<Text size='xl' view='success'>
					- Заголовок комментария: {commentInfo?.caption}
				</Text>
				<Text size='xl' view='warning'>
					- Описание: {commentInfo?.description}
				</Text>
			</div>
		);
	};

	if (!commentId && !TaskId) {
		return null;
	}

	return (
		<div className={style.commentInformation}>
			{renderHeader()}
			{renderContent()}
		</div>
	);
};

export default CommentInformation;
