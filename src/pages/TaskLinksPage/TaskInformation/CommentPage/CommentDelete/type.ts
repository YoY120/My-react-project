/**
 * Типы модального окна для удаления комментария
 */
export type CommentDeleteId = {
	/**
	 * Номер id удаляемой задачи
	 */
	isDeleteComment: number | null;
	/**
	 * id задачи
	 */
	isTaskId: number | null;
	/**
	 * Функция для закрытия модального окна
	 */
	onClose: () => void;
};
