import classNames from 'classnames';
import style from './taskAdd.module.scss';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks/store';
import { selectUserData } from '../../../state/auth/selector';
import { createTaskThunk } from '../../../state/task/thunk';
import { TextField } from '@consta/uikit/TextField';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';
import { IconClose } from '@consta/icons/IconClose';
import { IconAdd } from '@consta/icons/IconAdd';
import { useNavigate } from 'react-router-dom';
import { EmptyValuesTask } from './type';
import { CreateTaskListDTO } from '../../../type/serverInterface/TaskListDTO';

/**
 * Окно добавления новой задачи
 */
const TaskAdd = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const user = useAppSelector(selectUserData);

	const [isLoading, setIsLoading] = useState(false);

	const [form, setForm] = useState<CreateTaskListDTO>(EmptyValuesTask);

	const handleInputCaption = (value: string | null) => {
		setForm(valueForm => ({ ...valueForm, caption: value }));
	};

	const handleAddTask = () => {
		if (user && !isLoading) {
			setIsLoading(true);
			dispatch(createTaskThunk({ body: form, userId: user.id }))
				.then(() => {
					setForm(EmptyValuesTask);
					navigate('/');
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	};

	const renderButtonMenu = () => {
		return (
			<div className={classNames(style.taskAdd_Header_Menu)}>
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
					onClick={() => navigate('/')}
				/>
			</div>
		);
	};

	const renderHeader = () => {
		return (
			<div className={classNames(style.taskAdd_Header)}>
				<Text
					size='3xl'
					view='primary'
					font='mono'
					weight='black'
					decoration='underline'
				>
					Добавить задачу
				</Text>
				{renderButtonMenu()}
			</div>
		);
	};

	const renderBody = () => {
		return (
			<div className={classNames(style.taskAdd_TextField)}>
				<TextField
					label='Введите имя для новой задачи'
					onChange={handleInputCaption}
					value={form?.caption}
				/>
			</div>
		);
	};

	return (
		<div className={classNames(style.taskAdd)}>
			{renderHeader()}
			{renderBody()}
		</div>
	);
};

export default TaskAdd;
