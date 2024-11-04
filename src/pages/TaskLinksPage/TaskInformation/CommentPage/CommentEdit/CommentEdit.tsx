import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks/store';
import { EditTCommentDTO } from '../../../../../type/serverInterface/CommentDTO';
import { selectComment } from '../../../../../state/comment/selector';
import {
	editCommentThunk,
	getCommentByIdThunk,
} from '../../../../../state/comment/thunk';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';
import style from './CommentEdit.module.scss';
import { IconCheck } from '@consta/icons/IconCheck';
import { IconClose } from '@consta/icons/IconClose';
import { TextField } from '@consta/uikit/TextField';

/**
 * Экран редактирование описания комментария
 */
const CommentEdit = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const commentEditInformation = useAppSelector(selectComment());

	const { commentId, TaskById } = useParams<{
		commentId: string;
		TaskById: string;
	}>();
	const formattedCommentId = Number(commentId);

	const [isLoading, setIsLoading] = useState(false);

	const [form, setForm] = useState<EditTCommentDTO | null>(
		commentEditInformation
	);

	console.log(TaskById);

	useEffect(() => {
		formattedCommentId && dispatch(getCommentByIdThunk(formattedCommentId));
	}, [dispatch, formattedCommentId]);

	const handleCloseClick = () => {
		return navigate(`/taskInformation/${TaskById}`);
	};

	const handleInput =
		(key: keyof EditTCommentDTO) => (value: string | null) => {
			form && setForm({ ...form, [key]: value });
		};

	const handleAddComment = () => {
		form &&
			formattedCommentId &&
			dispatch(editCommentThunk({ body: form, commentId: formattedCommentId }))
				.then(handleCloseClick)
				.catch(() => {
					console.log('error');
				});
	};

	// const handleAddComment = () => {
	// 	if (form && commentEditInformation && !isLoading) {
	// 		setIsLoading(true);
	// 		dispatch(
	// 			editCommentThunk({ body: form, commentId: formattedTaskId })
	// 		).finally(() => {
	// 			setIsLoading(false);
	// 		});
	// 	}
	// };

	const renderHeader = () => {
		return (
			<div className={style.commentEdit_Header}>
				<Text
					size='3xl'
					view='primary'
					font='mono'
					weight='black'
					decoration='underline'
				>
					Редактирование задачи с id №{commentId}
				</Text>
				<div className={style.commentEdit_Header_Menu}>
					<Button
						onlyIcon
						view='ghost'
						iconRight={IconCheck}
						onClick={handleAddComment}
					/>
					<Button
						onlyIcon
						view='ghost'
						iconRight={IconClose}
						onClick={handleCloseClick}
					/>
				</div>
			</div>
		);
	};

	const renderContent = () => {
		return (
			<div className={style.commentEdit_TextField}>
				<TextField
					name='caption'
					label='Здесь можно будет изменить имя заголовка:'
					onChange={handleInput('caption')}
					value={form?.caption}
				/>
				<TextField
					name='description'
					label='Здесь можно будет изменить описание комментария:'
					onChange={handleInput('description')}
					value={form?.description}
				/>
			</div>
		);
	};

	return (
		<div className={style.commentEdit}>
			{renderHeader()}
			{renderContent()}
		</div>
	);
};

export default CommentEdit;
