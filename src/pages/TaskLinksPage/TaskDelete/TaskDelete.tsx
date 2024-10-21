import React, { FC } from 'react';
import { Modal } from '@consta/uikit/Modal';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';
import { useAppDispatch } from '../../../app/hooks/store';
import {
	deleteTaskThunk,
	getListOfTaskListThunk,
} from '../../../state/task/thunk';
import { IconTrash } from '@consta/icons/IconTrash';
import { IconClose } from '@consta/icons/IconClose';
import { TaskDeleteId } from './type';
import style from './taskDelete.module.scss';

/**
 * Модальное окно для удаления задачи
 */
const TaskDelete: FC<TaskDeleteId> = ({ isDeleteTask, onClose }) => {
	const dispatch = useAppDispatch();

	const handDeleteTaskClick = () => {
		isDeleteTask &&
			dispatch(deleteTaskThunk(isDeleteTask)).then(() => {
				dispatch(getListOfTaskListThunk());
				onClose();
			});
	};

	const renderMenu = () => {
		return (
			<div className={style.taskDelete_Content_Menu}>
				<Button
					label='Все равно удалить'
					iconLeft={IconTrash}
					view='clear'
					onClick={handDeleteTaskClick}
				/>
				<Button
					label='Отменить'
					view='clear'
					iconRight={IconClose}
					onClick={onClose}
				/>
			</div>
		);
	};

	return (
		<Modal
			isOpen={Boolean(isDeleteTask)}
			hasOverlay
			onClickOutside={onClose}
			className={style.taskDelete}
		>
			<div className={style.taskDelete_Content}>
				<Text size='2xl' view='primary'>
					Вы точно хотите удалить задачу?
				</Text>
				<Text size='s' view='ghost'>
					Удаляться все данные, которые содержала в себе задача
				</Text>
				{renderMenu()}
			</div>
		</Modal>
	);
};

export default TaskDelete;
