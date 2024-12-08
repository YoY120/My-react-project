import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import styles from './taskTablePage.module.scss';
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
import { IconEdit } from '@consta/icons/IconEdit';
import { TextField } from '@consta/uikit/TextField';
import { FieldGroup } from '@consta/uikit/FieldGroup';
import helperSortTable from '../../../helpers';
import useSearchData from '../../../hooks';

/**
 * Основная таблица
 */
const TaskTablePage = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const dataListOfTaskList = useAppSelector(selectListOfTaskList());

	const [formDelete, setFormDelete] = useState<number | null>(null);

	const [isSorting, setIsSorting] = useState<boolean>(false);

	const [search, setSearch] = useState<string | null>(null);

	useEffect(() => {
		dispatch(getListOfTaskListThunk());
	}, []);

	const copyTaskArray = [...dataListOfTaskList];

	const sortTask = helperSortTable(copyTaskArray, isSorting);

	const formattedTaskList = sortTask.map((task: TaskListDTO): NewTaskType => {
		return { ...task, id: String(task.id) };
	});

	const searchTask = useSearchData(formattedTaskList, search, 'caption');

	const renderTableHeader = () => {
		return (
			<div className={classNames(styles.taskTablePage_header)}>
				<div className={styles.taskTablePage_header_Menu}>
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
				<FieldGroup form='round' size='m'>
					<TextField
						placeholder='Поиск по полю Caption'
						value={search}
						onChange={setSearch}
					/>
					<Button
						view='ghost'
						label='Сортировка'
						onClick={() => setIsSorting(!isSorting)}
					/>
				</FieldGroup>
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
					onlyIcon
					view='clear'
					iconRight={IconEdit}
					onClick={() => navigate(`/taskEdit/${rowId.id}`)}
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
				stickyHeader
				rows={searchTask}
				columns={[
					{
						title: 'Id',
						accessor: 'id',
						align: 'center',
					},
					{ title: 'Caption', accessor: 'caption', align: 'center' },
					{
						title: 'Manage',
						accessor: 'manage',
						align: 'center',
						renderCell: rowId => handleMenuTable(rowId),
					},
				]}
			/>
		);
	};

	return (
		<div className={classNames(styles.taskTablePage)}>
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

export default TaskTablePage;
