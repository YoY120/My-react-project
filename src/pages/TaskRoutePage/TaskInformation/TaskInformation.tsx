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
 */
const TaskInformation = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { TaskId } = useParams<{ TaskId: string }>();
	const formattedTaskId = Number(TaskId);

	const taskInfo = useAppSelector(selectTask());

	useEffect(() => {
		formattedTaskId && dispatch(getTaskListByIdThunk(formattedTaskId));
	}, [dispatch, formattedTaskId]);

	const renderHeaderMenu = () => {
		return (
			<div className={style.taskInformation_Header_Menu}>
				<Button
					onlyIcon
					view='ghost'
					iconRight={IconEdit}
					onClick={() => navigate(`/taskEdit/${formattedTaskId}`)}
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
			<div className={style.taskInformation_Header}>
				<Text size='l' view='primary'>
					Подробная информация о задачи c id - №{taskInfo?.id}:
				</Text>
				{renderHeaderMenu()}
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

	if (!TaskId) {
		return null;
	}

	return (
		<div className={style.taskInformation}>
			{renderHeader()}
			{renderContent()}
			<CommentPageRoute />
		</div>
	);
};

export default TaskInformation;
