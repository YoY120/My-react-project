/**
 * Типы модального окна для удаления задачи
 */
export type TaskDeleteId = {
  /**
   * Номер id удаляемой задачи
   */
	isDeleteTask: number | null;
  /**
   * Функция для закрытия модального окна
   */
	onClose: () => void;
};
