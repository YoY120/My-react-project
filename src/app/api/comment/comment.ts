import { CommentDTO } from '../../../type/serverInterface/CommentDTO';
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
}
