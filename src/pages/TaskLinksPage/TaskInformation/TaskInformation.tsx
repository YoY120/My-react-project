import { Text } from '@consta/uikit/Text';
import style from './taskInformation.module.scss';
import React, { useEffect } from 'react';
import { Button } from '@consta/uikit/Button';
import { getTaskListByIdThunk } from '../../../state/task/thunk';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks/store';
import { IconClose } from '@consta/icons/IconClose';
import { IconEdit } from '@consta/icons/IconEdit';
import { selectTask } from '../../../state/task/selector';
import CommentPageRoute from './CommentPage';

/**
 * Окно с информацией о задачи
 * @returns
 */
const TaskInformation = () => {
	const { TaskById } = useParams<{ TaskById: string }>();

	const taskInfo = useAppSelector(selectTask());

	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	// Получение данных с сервера по id
	useEffect(() => {
		TaskById && dispatch(getTaskListByIdThunk(Number(TaskById)));
	}, [dispatch, TaskById]);

	const renderHeader = () => {
		return (
			<div className={style.taskInformation_Header}>
				<Text size='l' view='primary'>
					Подробная информация о задачи c id - №{taskInfo?.id}:
				</Text>
				<div className={style.taskInformation_Header_Menu}>
					<Button
						onlyIcon
						view='ghost'
						iconRight={IconEdit}
						onClick={() => navigate(`/taskEdit/${TaskById}`)}
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
			<div className={style.taskInformation_Content}>
				<Text size='2xl' view='primary'>
					{taskInfo?.caption}
				</Text>
			</div>
		);
	};

	return (
		<div className={style.taskInformation}>
			{renderHeader()}
			{renderContent()}
			<CommentPageRoute/>
		</div>
	);
};

export default TaskInformation;
