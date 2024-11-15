import { IconAdd } from '@consta/icons/IconAdd';
import { IconClose } from '@consta/icons/IconClose';
import React, { useState } from 'react';
import { EmptyValuesComment } from './type';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks/store';
import { selectUserData } from '../../../../../state/auth/selector';
import { useNavigate, useParams } from 'react-router-dom';
import { createCommentThunk } from '../../../../../state/comment/thunk';
import { CreateCommentDTO } from '../../../../../type/serverInterface/CommentDTO';
import style from './commentAdd.module.scss';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';
import { TextField } from '@consta/uikit/TextField';

/**
 * Страница добавления комментария
 */
const CommentAdd = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const user = useAppSelector(selectUserData);

	const { TaskId } = useParams<{ TaskId: string }>();
	const formattedTaskId = Number(TaskId);

	const [isLoading, setIsLoading] = useState(false);

	const [form, setForm] = useState<CreateCommentDTO>(EmptyValuesComment);

	const handleInputCaption =
		(key: keyof CreateCommentDTO) => (value: string | null) => {
			setForm(valueForm => ({ ...valueForm, [key]: value }));
		};

	const handleAddTask = () => {
		if (user && !isLoading) {
			setIsLoading(true);
			dispatch(
				createCommentThunk({
					body: form,
					userId: user.id,
					taskListId: formattedTaskId,
				})
			)
				.then(() => {
					setForm(EmptyValuesComment);
					navigate(`/taskInformation/${formattedTaskId}`);
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	};

	const renderHeaderMenu = () => {
		return (
			<div className={style.commentAdd_Header_Menu}>
				<Button
					onlyIcon
					view='ghost'
					iconRight={IconAdd}
					onClick={handleAddTask}
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
			<div className={style.commentAdd_Header}>
				<Text
					size='2xl'
					view='primary'
					font='mono'
					weight='black'
					decoration='underline'
				>
					Добавить комментарии
				</Text>
				{renderHeaderMenu()}
			</div>
		);
	};

	const renderBody = () => {
		return (
			<div className={style.commentAdd_TextField}>
				<TextField
					label='Введите заголовок для комментария'
					onChange={handleInputCaption('caption')}
					value={form.caption}
				/>
				<TextField
					label='Введите описание комментария'
					onChange={handleInputCaption('description')}
					value={form.description}
				/>
			</div>
		);
	};

	if (!TaskId) {
		return null;
	}

	return (
		<div className={style.commentAdd}>
			{renderHeader()}
			{renderBody()}
		</div>
	);
};

export default CommentAdd;
