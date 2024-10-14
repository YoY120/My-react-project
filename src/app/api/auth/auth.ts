import { AbstractApiModule } from '../abstractApiModule';
import {
	MainUserDataDTO,
	SignInUserDTO,
	SignUpUserDTO,
	TokenPairDTO,
} from '../../../type/serverInterface/user/userDTO';

export class AuthModule extends AbstractApiModule {
	/**
	 * Получение данных пользователя
	 */
	fetchMainUserData(): Promise<MainUserDataDTO> {
		return this.request.get<unknown, MainUserDataDTO>(
			'http://localhost:3000/auth'
		);
	}

	/**
	 * Авторизация
	 */
	signIn(data: SignInUserDTO): Promise<void> {
		return this.request
			.post<SignInUserDTO, TokenPairDTO>(
				'http://localhost:3000/auth/signIn',
				data
			)
			.then(response => {
				this.request.accessToken = response.accessToken; 
			});
	}

	/**
	 * Регистрация
	 */
	signUp(data: SignUpUserDTO): Promise<void> {
		return this.request.post<SignUpUserDTO>(
			'http://localhost:3000/auth/signUp',
			data
		);
	}
}
