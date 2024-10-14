import { AxiosCoreApi } from './axiosCore';
import { AuthModule } from './auth';

export class Api {
	private readonly request: AxiosCoreApi;

	public readonly auth: AuthModule;

	constructor() {
		this.request = new AxiosCoreApi();

		this.auth = new AuthModule(this.request);
	}

	clearTokens(): void {
		this.request.accessToken = null;
	}

	saveToken(token: string): void {
		this.request.accessToken = token;
	}
}

export const api = new Api();
