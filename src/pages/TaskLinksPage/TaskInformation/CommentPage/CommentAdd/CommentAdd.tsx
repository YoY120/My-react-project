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

const CommentAdd = () => {
	const { TaskById } = useParams<{ TaskById: string }>();

	const [form, setForm] = useState<CreateCommentDTO>(EmptyValuesComment);

	const dispatch = useAppDispatch();

	const user = useAppSelector(selectUserData);

	const navigate = useNavigate();

	const handleInputCaption =
		(key: keyof CreateCommentDTO) => (value: string | null) => {
			setForm(valueForm => ({ ...valueForm, [key]: value }));
		};

	console.log(TaskById);

	const handleAddTask = () => {
		user &&
			dispatch(
				createCommentThunk({
					body: form,
					userId: user.id,
					taskListId: Number(TaskById),
				})
			).then(() => {
				setForm(EmptyValuesComment);
				navigate(`/taskInformation/${TaskById}`);
			});
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
						onClick={() => navigate(`/taskInformation/${TaskById}`)}
					/>
				</div>
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

	return (
		<div className={style.commentAdd}>
			{renderHeader()}
			{renderBody()}
		</div>
	);
};

export default CommentAdd;
