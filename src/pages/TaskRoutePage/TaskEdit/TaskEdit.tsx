import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks/store';
import { useNavigate, useParams } from 'react-router-dom';
import style from './taskEdit.module.scss';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';
import { IconCheck } from '@consta/icons/IconCheck';
import { IconClose } from '@consta/icons/IconClose';
import { TextField } from '@consta/uikit/TextField';
import { EditTaskListDTO } from '../../../type/serverInterface/TaskListDTO';
import { selectTask } from '../../../state/task/selector';
import { editTaskThunk, getTaskListByIdThunk } from '../../../state/task/thunk';

/**
 * Экран редактирования задачи
 */
const TaskEdit = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { TaskId } = useParams<{ TaskId: string }>();
	const formattedTaskId = Number(TaskId);

	const taskInformation = useAppSelector(selectTask());

	const [isLoading, setIsLoading] = useState(false);

	const [form, setForm] = useState<EditTaskListDTO | null>(taskInformation);

	useEffect(() => {
		formattedTaskId &&
			dispatch(getTaskListByIdThunk(formattedTaskId)).then(() => setForm(form));
	}, [dispatch, formattedTaskId]);

	const handleInputCaption = (value: string | null) => {
		formattedTaskId &&
			setForm(valueForm => ({
				...valueForm,
				caption: value ? value : '',
			}));
	};

	const handleAddTask = () => {
		if (form && taskInformation && !isLoading) {
			setIsLoading(true);
			dispatch(editTaskThunk({ body: form, taskId: formattedTaskId }))
				.then(() => navigate('/'))
				.finally(() => setIsLoading(false));
		}
	};

	const renderHeaderMenu = () => {
		return (
			<div className={style.taskEdit_Header_Menu}>
				<Button
					onlyIcon
					view='ghost'
					iconRight={IconCheck}
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
			<div className={style.taskEdit_Header}>
				<Text
					size='3xl'
					view='primary'
					font='mono'
					weight='black'
					decoration='underline'
				>
					Редактирование задачи с id №{formattedTaskId}
				</Text>
				{renderHeaderMenu()}
			</div>
		);
	};

	const renderContent = () => {
		return (
			<div className={style.taskEdit_TextField}>
				<TextField
					label='Здесь можно будет изменить описание задачи:'
					onChange={handleInputCaption}
					value={taskInformation?.caption}
				/>
			</div>
		);
	};

	if (!TaskId) {
		return null;
	}

	return (
		<div className={style.taskEdit}>
			{renderHeader()}
			{renderContent()}
		</div>
	);
};

export default TaskEdit;
