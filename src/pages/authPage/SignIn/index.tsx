import { memo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SignInUserDTO } from '../../../type/serverInterface/user/userDTO';
import { Text } from '@consta/uikit/Text';
import { TextField } from '@consta/uikit/TextField';
import { Button } from '@consta/uikit/Button';
import { useAppDispatch } from '../../../app/hooks/store';
import { signInAction } from '../../../state/auth/actiom';
import style from './SignIn.module.scss';

const initialValues: SignInUserDTO = {
	email: 'Andrey@.ru',
	password: 'Andrey',
};

/**
 * Регистрация
 */
export const SignIn = memo(() => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [formValue, setFormValue] = useState(initialValues);
	const { password, email } = formValue;

	const handleChange =
		(key: keyof SignInUserDTO) => (value: string | number | null) => {
			setFormValue(prevState => ({ ...prevState, [key]: value }));
		};

	const handleSubmit = () => {
		dispatch(signInAction(formValue)).then(() => {
			navigate('/');
		});
	};

	return (
		<div className={style.SignIn}>
			<div className={style.SignIn_Wrapper}>
				<Text className={style.SignIn_Header} size='4xl' view='primary'>
					Log In
				</Text>
				<TextField
					label='email'
					value={email}
					onChange={handleChange('email')}
				/>
				<TextField
					label='password'
					type='password'
					value={password}
					onChange={handleChange('password')}
				/>
				<Button label='Enter' onClick={handleSubmit} />
				<Link to='/auth/SignUp'>Sign Up</Link>
			</div>
		</div>
	);
});
