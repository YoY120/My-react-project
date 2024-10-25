import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks/store';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './commentTable.module.scss';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';
import { getListOfCommentByIdTaskListThunk } from '../../../../../state/comment/thunk';
import { CommentDTO } from '../../../../../type/serverInterface/CommentDTO';
import { selectorListOfCommentList } from '../../../../../state/comment/selector';
import { NewCommentType } from './type';
import { Table } from '@consta/uikit/Table';
import { IconPaste } from '@consta/icons/IconPaste';

/**
 * Таблица для комментариев
 */
const CommentTable = () => {
	const { TaskById } = useParams<{ TaskById: string }>();

	const formattedTaskById = Number(TaskById);

	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	const dataListOfCommentList = useAppSelector(selectorListOfCommentList());

	useEffect(() => {
		dispatch(getListOfCommentByIdTaskListThunk({ taskId: formattedTaskById }));
	}, []);

	const formattedTaskList = dataListOfCommentList.map(
		(comment: CommentDTO): NewCommentType => {
			return { ...comment, id: String(comment.id) };
		}
	);

	const handleMenuTable = (rowId: NewCommentType) => {
		return (
			<div>
				<Button
					view='clear'
					onlyIcon
					iconRight={IconPaste}
					onClick={() => navigate(`commentInformation/${rowId.id}`)}
				/>
			</div>
		);
	};

	const renderTableHeader = () => {
		return (
			<div className={styles.commentTable_header}>
				<Text
					size='2xl'
					view='primary'
					font='mono'
					weight='black'
					decoration='underline'
				>
					Комментарии:
				</Text>
				<Button
					view='ghost'
					label='+ Новый комментарии'
					onClick={() => navigate(`commentAdd`)}
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
					{ title: 'Description', accessor: 'description' },
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
		<div className={styles.commentTable}>
			{renderTableHeader()}
			{renderTableTaskList()}
		</div>
	);
};

export default CommentTable;
