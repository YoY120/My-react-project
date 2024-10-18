/**
 * Типы данных нового пользователя
 */
export type MainUserDataDTO = {
	/**
	 * id для нового пользователя
	 */
	id: number;
	/**
	 * Имя пользователя
	 */
	username: string;
	/**
	 * Имя
	 */
	name: string;
	/**
	 * Почта
	 */
	email: string;
};

/**
 * Тип для регистрации
 */
export type SignInUserDTO = {
	/**
	 * Почта
	 */
	email: string;
	/**
	 * пароль
	 */
	password: string;
};

/**
 * Тип для получения токена при регистрации
 */
export type TokenPairDTO = {
	/**
	 * Имя токена
	 */
	accessToken: string;
};

/**
 *  Типы для регистрации нового пользователя
 */
export type SignUpUserDTO = {
	/**
	 * Имя пользователя
	 */
	username: string;
	/**
	 * Почта
	 */
	email: string;
	/**
	 * Имя
	 */
	name: string;
	/**
	 * Пароль
	 */
	password: string;
};
