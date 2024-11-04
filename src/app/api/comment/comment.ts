import {
	CommentDTO,
	CreateCommentDTO,
	EditTCommentDTO,
} from '../../../type/serverInterface/CommentDTO';
import { AbstractApiModule } from '../abstractApiModule';

const baseUrl = 'http://localhost:3000/comment';

export class CommentModule extends AbstractApiModule {
	/**
	 * Функция получения данных comment со сервера
	 * @param taskId - идентификатор id задачи
	 * @returns Возвращает массив данных комментария для нужной задачи
	 */
	getListOfCommentByIdTaskList(taskId: number): Promise<CommentDTO[]> {
		return this.request.get<unknown, CommentDTO[]>(`${baseUrl}/list/${taskId}`);
	}

	/**
	 * Получение подробной информации комментарии
	 * @param commentId - идентификатор нужного комментария
	 * @returns Возвращает типы данных подробной информации от комментариев
	 */
	getCommentById(commentId: number): Promise<CommentDTO> {
		return this.request.get<unknown, CommentDTO>(`${baseUrl}/${commentId}`);
	}

	/**
	 * Запрос на сервер для создания нового комментария пользователем
	 * @param body - данные комментария
	 * @param userId - id пользователя
	 * @param taskListId - идентификатор id задачи
	 * @returns возвращает новый массив данных с новым комментарием
	 */
	createComment(
		body: CreateCommentDTO,
		userId: number,
		taskId: number
	): Promise<number> {
		return this.request.post<CreateCommentDTO, number>(
			`${baseUrl}/${userId}/${taskId}`,
			body
		);
	}

	/**
	 * Редактирование комментария
	 * @param body - типы данных
	 * @param commentId - идентификатор id редактируемого комментария
	 * @returns возвращает тип данных, которые нужно отредактировать
	 */
	editComment(body: EditTCommentDTO, commentId: number): Promise<void> {
		return this.request.patch<EditTCommentDTO, void>(
			`${baseUrl}/${commentId}`,
			body
		);
	}

	/**
	 * Удаление комментария
	 * @param commentId - идентификатор комментария, которого нужно удалить
	 * @returns Возвращает id комментария, который был удален
	 */
	deleteComment(commentId: number): Promise<void> {
		return this.request.delete(`${baseUrl}/${commentId}`);
	}
}
