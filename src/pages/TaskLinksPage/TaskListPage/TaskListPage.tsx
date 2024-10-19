import classNames from 'classnames';
import React, { useEffect } from 'react';
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

/**
 * Основная таблица
 */
const TaskListPage = () => {
	// Отправка запроса на сервер
	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	// хранение данных
	const dataListOfTaskList = useAppSelector(selectListOfTaskList());

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

	const renderTableTaskList = () => {
		return (
			<Table
				rows={formattedTaskList}
				columns={[
					{ title: 'Id', accessor: 'id' },
					{ title: 'Caption', accessor: 'caption' },
					{ title: 'Manage', accessor: 'manage' },
				]}
			/>
		);
	};

	return (
		<div className={classNames(styles.taskListPage)}>
			{renderTableHeader()}
			{renderTableTaskList()}
		</div>
	);
};

export default TaskListPage;
