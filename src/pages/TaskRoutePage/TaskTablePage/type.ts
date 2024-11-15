/**
 * Новый формат
 */
export type NewTaskType = {
	/**
	 *  id задачи
	 */
	id: string;
	/**
	 * Описание задачи
	 */
	caption: string;
	/**
	 *  Меню
	 */
	manage?: React.ReactNode;
};
