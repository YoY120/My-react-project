/**
 * Новый формат
 */
export type NewCommentType = {
	/**
	 *  id задачи
	 */
	id: string;
	/**
	 * Заголовок комментария 
	 */
	caption: string;
  /**
   * Описание комментария
   */
	description: string;
	/**
	 *  Меню
	 */
	manage?: React.ReactNode;
};
