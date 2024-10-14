export type MainUserDataDTO = {
	id: number;
	username: string;
	name: string;
	email: string;
};

export type SignInUserDTO = {
	email: string;
	password: string;
};

export type TokenPairDTO = {
	accessToken: string;
};

export type SignUpUserDTO = {
	username: string;
	email: string;
	name: string;
	password: string;
};
