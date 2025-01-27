import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';

export const ACCESS_TOKEN_STORAGE_NAME = 'api/accessToken';

export class AxiosCoreApi {
	private readonly _apiConfig: AxiosRequestConfig;
	private _axiosInstance: AxiosInstance;
	private _accessToken: string | null = null;

	constructor(apiConfig?: AxiosRequestConfig) {
		this._apiConfig = apiConfig || {};
		this._axiosInstance = axios.create(apiConfig);

		this.readAccessToken();

		this.extractData = this.extractData.bind(this);

		this._axiosInstance.interceptors.request.use(config => {
			if (this._accessToken)
				console.log('this._accessToken, ', this._accessToken)

				config.headers.Authorization = `Bearer ${this._accessToken}`;
			return config;
		});
	}

	public get accessToken() {
		return this._accessToken;
	}

	public set accessToken(value: string | null) {
		this._accessToken = value;
		this.saveAccessToken(value);
	}

	public get<Req extends {} | unknown = unknown, Res extends {} | void = void>(
		url: string,
		params?: Req
	): Promise<Res> {
		return this._axiosInstance.get<Res>(url, { params }).then(this.extractData);
	}

	public post<Req extends {} | unknown = unknown, Res extends {} | void = void>(
		url: string,
		data?: Req
	): Promise<Res> {
		return this._axiosInstance.post<Res>(url, data).then(this.extractData);
	}

	public put<Req extends {} | unknown = unknown, Res extends {} | void = void>(
		url: string,
		data?: Req
	): Promise<Res> {
		return this._axiosInstance.put<Res>(url, data).then(this.extractData);
	}

	public patch<
		Req extends {} | unknown = unknown,
		Res extends {} | void = void
	>(url: string, data?: Req): Promise<Res> {
		return this._axiosInstance.patch<Res>(url, data).then(this.extractData);
	}

	public delete<Res extends {} | void = void>(url: string): Promise<Res> {
		return this._axiosInstance.delete<Res>(url).then(this.extractData);
	}

	private extractData<T>(response: AxiosResponse<T>): T {
		return response.data;
	}

	private readAccessToken(): boolean {
		this._accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_NAME) || null;
		return Boolean(this._accessToken);
	}

	private saveAccessToken(token: string | null): void {
		if (!token) return localStorage.removeItem(ACCESS_TOKEN_STORAGE_NAME);
		localStorage.setItem(ACCESS_TOKEN_STORAGE_NAME, token);
	}
}
