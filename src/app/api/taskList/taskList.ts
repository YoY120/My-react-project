import { TaskListDTO } from '../../../type/serverInterface/TaskListDTO';
import { AbstractApiModule } from '../abstractApiModule';

// Шаблон
const baseUrl = 'http://localhost:3000/taskList';

/**
 * Получение и отправка данных на сервер
 */
export class TaskListModule extends AbstractApiModule {
	// получение данных списка
	getListOfTaskList(): Promise<TaskListDTO[]> {
		return this.request.get<unknown, TaskListDTO[]>(`${baseUrl}/list`);
	}
}
