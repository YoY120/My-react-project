import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import styles from './taskListPage.module.scss';
import { Table } from '@consta/uikit/Table';
import { NewTaskType } from './type';
import { getListOfTaskListThunk } from '../../../state/task/thunk';
import { useAppDispatch, useAppSelector } from '../../../app/hooks/store';
import { selectListOfTaskList } from '../../../state/task/selector';
import { TaskListDTO } from '../../../type/serverInterface/TaskListDTO';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';
import { useNavigate } from 'react-router-dom';
import { IconPaste } from '@consta/icons/IconPaste';
import { IconTrash } from '@consta/icons/IconTrash';
import TaskDelete from '../TaskDelete';

/**
 * Основная таблица
 */
const TaskListPage = () => {
	// Отправка запроса на сервер
	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	// хранение данных
	const dataListOfTaskList = useAppSelector(selectListOfTaskList());

	const [formDelete, setFormDelete] = useState<number | null>(null);

	// Запрос данных с сервера при переходе на страницу
	useEffect(() => {
		dispatch(getListOfTaskListThunk());
	}, []);

	// Новый формат
	const formattedTaskList = dataListOfTaskList.map(
		(task: TaskListDTO): NewTaskType => {
			return { ...task, id: String(task.id) };
		}
	);

	const renderTableHeader = () => {
		return (
			<div className={classNames(styles.taskListPage_header)}>
				<Text
					size='3xl'
					view='primary'
					font='mono'
					weight='black'
					decoration='underline'
				>
					Table Task
				</Text>
				<Button
					view='ghost'
					label='+ Новая задача'
					onClick={() => navigate('/taskAdd')}
				/>
			</div>
		);
	};

	const handleMenuTable = (rowId: NewTaskType) => {
		return (
			<div>
				<Button
					view='clear'
					onlyIcon
					iconRight={IconPaste}
					onClick={() => navigate(`/taskInformation/${rowId.id}`)}
				/>
				<Button
					view='clear'
					onlyIcon
					iconRight={IconTrash}
					onClick={() => setFormDelete(Number(rowId.id))}
				/>
			</div>
		);
	};

	const renderTableTaskList = () => {
		return (
			<Table
				rows={formattedTaskList}
				columns={[
					{ title: 'Id', accessor: 'id' },
					{ title: 'Caption', accessor: 'caption' },
					{
						title: 'Manage',
						accessor: 'manage',
						renderCell: rowId => handleMenuTable(rowId),
					},
				]}
			/>
		);
	};

	return (
		<div className={classNames(styles.taskListPage)}>
			{renderTableHeader()}
			{renderTableTaskList()}
			{formDelete && (
				<TaskDelete
					isDeleteTask={formDelete}
					onClose={() => setFormDelete(null)}
				/>
			)}
		</div>
	);
};

export default TaskListPage;
