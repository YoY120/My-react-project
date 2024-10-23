import {
	CreateTaskListDTO,
	EditTaskListDTO,
	TaskListDTO,
} from '../../../type/serverInterface/TaskListDTO';
import { AbstractApiModule } from '../abstractApiModule';

// Шаблон
const baseUrl = 'http://localhost:3000/taskList';

/**
 * Получение и отправка данных на сервер
 */
export class TaskListModule extends AbstractApiModule {
	/**
	 * Получение данных таблицы с сервера
	 */
	getListOfTaskList(): Promise<TaskListDTO[]> {
		return this.request.get<unknown, TaskListDTO[]>(`${baseUrl}/list`);
	}

	/**
	 * Получение нужной информации о задачи
	 * @param byId - идентификатор нужной задачи
	 */
	getTaskListById(byId: number): Promise<TaskListDTO> {
		return this.request.get<unknown, TaskListDTO>(`${baseUrl}/${byId}`);
	}

	/**
	 * Редактирование данных
	 * @param body - тип данных
	 * @param taskId - нужный id задачи
	 */
	editTask(body: EditTaskListDTO, taskId: number): Promise<void> {
		return this.request.patch<CreateTaskListDTO, void>(
			`${baseUrl}/${taskId}`,
			body
		);
	}

	/**
	 * Добавление данных
	 * @param body - типы данных
	 * @param userId - идентификатор пользователя
	 */
	createTask(body: CreateTaskListDTO, userId: number): Promise<number> {
		return this.request.post<CreateTaskListDTO, number>(
			`${baseUrl}/${userId}`,
			body
		);
	}

	/**
	 * Удаления задачи
	 * @param taskId - номер id, который нужно удалить
	 */
	deleteTask(taskId: number): Promise<void> {
		return this.request.delete<void>(`${baseUrl}/${taskId}`);
	}
}
