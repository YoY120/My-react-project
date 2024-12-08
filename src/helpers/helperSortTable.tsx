import React from 'react';

/**
 * Сортировка для задачи и комментариев
 * @param props - принимает типы TaskListDTO[] или CommentDTO
 * @param isBoolean - порядок сортировки
 * @returns возвращает отсортированный массив
 */
const helperSortTable = <T extends {id: number}>(
	props: T[],
	isBoolean: boolean
) => {
	const sortTask = props.sort((a, b): number => {
		return (b.id - a.id) * (isBoolean ? 1 : -1);
	});
	return sortTask
};

export default helperSortTable;
