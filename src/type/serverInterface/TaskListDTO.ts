/**
 * Основная информация о пользователе
 */
export type TaskListDTO = {
	/**
	 * id задачи
	 */
	id: number;
	/**
	 * Описание задачи
	 */
	caption: string;
};

/**
 * Добавление пользователя
 */
export type CreateTaskListDTO = {
	/**
	 * Описание для новой задачи
	 */
	caption: string | null;
};

/**
 * Редактирование пользователя
 */
export type EditTaskListDTO = {
	/**
	 * Редактирование описание задачи
	 */
	caption: string;
};
