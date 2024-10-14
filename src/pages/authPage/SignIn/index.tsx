import { memo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SignInUserDTO } from '../../../type/serverInterface/user/userDTO';
import { Text } from '@consta/uikit/Text';
import { TextField } from '@consta/uikit/TextField';
import { Button } from '@consta/uikit/Button';
import { useAppDispatch } from '../../../app/hooks/store';
import { signInAction } from '../../../state/auth/actiom';

const initialValues: SignInUserDTO = {
	email: 'Andrey@.ru',
	password: 'Andrey',
};

export const SignIn = memo(() => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [formValue, setFormValue] = useState(initialValues);
	const { password, email } = formValue;

	/// Обработчики
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
		<div>
			<Text size='4xl'>Log In</Text>
			<TextField label='email' value={email} onChange={handleChange('email')} />
			<TextField
				label='password'
				type='password'
				value={password}
				onChange={handleChange('password')}
			/>
			<Button label='Enter' onClick={handleSubmit} />
			<Link to='/auth/SignUp'>Sign Up</Link>
		</div>
	);
});
