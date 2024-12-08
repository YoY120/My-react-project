import React, { useEffect, useState } from 'react';
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
import { IconEdit } from '@consta/icons/IconEdit';
import CommentDelete from '../CommentDelete';
import { IconTrash } from '@consta/icons/IconTrash';
import { FieldGroup } from '@consta/uikit/FieldGroup';
import { TextField } from '@consta/uikit/TextField';
import helperSortTable from '../../../../../helpers';
import useSearchData from '../../../../../hooks';

/**
 * Таблица для комментариев
 */
const CommentTable = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const dataListOfCommentList = useAppSelector(selectorListOfCommentList());

	const { TaskId } = useParams<{ TaskId: string }>();
	const formattedTaskId = Number(TaskId);

	const [formDelete, setFormDelete] = useState<number | null>(null);

	const [isSorting, setIsSorting] = useState<boolean>(false);

	const [searchCaption, setSearchCaption] = useState<string | null>(null);

	const [searchDescription, setSearchDescription] = useState<string | null>(
		null
	);

	useEffect(() => {
		dispatch(getListOfCommentByIdTaskListThunk({ taskId: formattedTaskId }));
	}, []);

	const copyCommentArray = [...dataListOfCommentList];

	const sortComment = helperSortTable(copyCommentArray, isSorting);

	const formattedCommentList = sortComment.map(
		(comment: CommentDTO): NewCommentType => {
			return { ...comment, id: String(comment.id) };
		}
	);

	const searchComment = useSearchData(
		formattedCommentList,
		searchCaption || searchDescription,
		'caption'
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
				<Button
					onlyIcon
					view='clear'
					iconRight={IconEdit}
					onClick={() => navigate(`commentEdit/${rowId.id}`)}
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

	const renderTableHeader = () => {
		return (
			<div className={styles.commentTable_header}>
				<div className={styles.commentTable_header_menu}>
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
				<FieldGroup form='round' size='m'>
					<TextField
						placeholder='Поиск по полю Caption'
						value={searchCaption}
						onChange={setSearchCaption}
					/>
					<TextField
						placeholder='Поиск по полю Caption'
						value={searchDescription}
						onChange={setSearchDescription}
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

	const renderTableTaskList = () => {
		return (
			<Table
				stickyHeader
				rows={searchComment}
				columns={[
					{ title: 'Id', accessor: 'id', align: 'center' },
					{ title: 'Caption', accessor: 'caption', align: 'center' },
					{ title: 'Description', accessor: 'description', align: 'center' },
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

	if (!TaskId) {
		return null;
	}

	return (
		<div className={styles.commentTable}>
			{renderTableHeader()}
			{renderTableTaskList()}
			{formDelete && (
				<CommentDelete
					isTaskId={formattedTaskId}
					isDeleteComment={formDelete}
					onClose={() => setFormDelete(null)}
				/>
			)}
		</div>
	);
};

export default CommentTable;
