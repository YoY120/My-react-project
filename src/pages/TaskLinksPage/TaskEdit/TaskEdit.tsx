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
 * @returns
 */
const TaskEdit = () => {
	const { TaskById } = useParams<{ TaskById: string }>();

	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	const taskInformation = useAppSelector(selectTask());

	const [form, setForm] = useState<EditTaskListDTO | null>(taskInformation);

	useEffect(() => {
		TaskById &&
			dispatch(getTaskListByIdThunk(Number(TaskById))).then(() =>
				setForm(form)
			);
	}, [dispatch, TaskById]);

	const handleInputCaption = (value: string | null) => {
		TaskById &&
			setForm(valueForm => ({
				...valueForm,
				caption: value ? value : '',
			}));
	};

	const handleAddTask = () => {
		form &&
			taskInformation &&
			dispatch(editTaskThunk({ body: form, taskId: Number(TaskById) })).then(
				() => navigate('/')
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
					Редактирование задачи с id №{TaskById}
				</Text>
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

	return (
		<div className={style.taskEdit}>
			{renderHeader()}
			{renderContent()}
		</div>
	);
};

export default TaskEdit;
