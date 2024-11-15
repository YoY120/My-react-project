import { memo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SignUpUserDTO } from '../../../type/serverInterface/user/userDTO';
import { useAppDispatch } from '../../../app/hooks/store';
import { Text } from '@consta/uikit/Text';
import { TextField } from '@consta/uikit/TextField';
import { Button } from '@consta/uikit/Button';
import { signUpAction } from '../../../state/auth/actiom';
import style from './SignUp.module.scss';

const initialValues: SignUpUserDTO = {
	email: '',
	name: '',
	password: '',
	username: '',
};

/**
 * Форма регистрации нового пользователя
 */
export const SignUp = memo(() => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [formValue, setFormValue] = useState(initialValues);
	const { name, username, password, email } = formValue;

	const handleChange =
		(key: keyof SignUpUserDTO) => (value: string | number | null) => {
			setFormValue(prevState => ({ ...prevState, [key]: value }));
		};

	const handleSubmit = () => {
		dispatch(signUpAction(formValue)).then(() => {
			navigate('/');
		});
	};

	return (
		<div className={style.SignUp}>
			<div className={style.SignUp_Wrapper}>
				<Text className={style.SignUp_Header} size='4xl' view='primary'>
					Registration
				</Text>
				<TextField
					label='email'
					value={email}
					onChange={handleChange('email')}
				/>
				<TextField
					label='username'
					value={username}
					onChange={handleChange('username')}
				/>
				<TextField label='name' value={name} onChange={handleChange('name')} />
				<TextField
					label='password'
					type='password'
					value={password}
					onChange={handleChange('password')}
				/>
				<Button label='Enter' onClick={handleSubmit} />
				<Link to='/auth/SignIn'>Sign In</Link>
			</div>
		</div>
	);
});
