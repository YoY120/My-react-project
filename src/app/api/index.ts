import { AxiosCoreApi } from './axiosCore';
import { AuthModule } from './auth';
import { TaskListModule } from './taskList';

export class Api {
	private readonly request: AxiosCoreApi;

	public readonly auth: AuthModule;
	public readonly taskList: TaskListModule;

	constructor() {
		this.request = new AxiosCoreApi();

		this.auth = new AuthModule(this.request);
		this.taskList = new TaskListModule(this.request);
	}

	clearTokens(): void {
		this.request.accessToken = null;
	}

	saveToken(token: string): void {
		this.request.accessToken = token;
	}
}

export const api = new Api();
