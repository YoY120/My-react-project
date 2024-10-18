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

/**
 * Основная таблица
 */
const TaskListPage = () => {
	// Отправка запроса на сервер
	const dispatch = useAppDispatch();

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
					Задачи
				</Text>
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
