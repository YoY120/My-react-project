import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks/store';
import { selectComment } from '../../../../../state/comment/selector';
import { getCommentByIdThunk } from '../../../../../state/comment/thunk';
import { Text } from '@consta/uikit/Text';
import style from './commentInformation.module.scss';
import { IconClose } from '@consta/icons/IconClose';
import { Button } from '@consta/uikit/Button';

/**
 * Экран информации комментария
 */
const CommentInformation = () => {
	const { commentId, TaskById } = useParams<{
		commentId: string;
		TaskById: string;
	}>();

	const commentInfo = useAppSelector(selectComment());

	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	useEffect(() => {
		commentId && dispatch(getCommentByIdThunk(Number(commentId)));
	}, [dispatch, commentId]);

	const renderHeader = () => {
		return (
			<div className={style.commentInformation_Header}>
				<Text size='l' view='primary'>
					Подробная информация о комментарии c id №{commentInfo?.id}:
				</Text>
				<div className={style.commentInformation_Header_Menu}>
					<Button
						onlyIcon
						view='ghost'
						iconRight={IconClose}
						onClick={() => navigate(`/taskInformation/${TaskById}`)}
					/>
				</div>
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

	return (
		<div className={style.commentInformation}>
			{renderHeader()}
			{renderContent()}
		</div>
	);
};

export default CommentInformation;
