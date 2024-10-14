import { useFormik } from 'formik';
import { memo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SignUpUserDTO } from '../../../type/serverInterface/user/userDTO';
import { useAppDispatch } from '../../../app/hooks/store';
import { Text } from '@consta/uikit/Text';
import { TextField } from '@consta/uikit/TextField';
import { Button } from '@consta/uikit/Button';
import { signUpAction } from '../../../state/auth/actiom';

const initialValues: SignUpUserDTO = {
	email: '',
	name: '',
	password: '',
	username: '',
};

export const SignUp = memo(() => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [formValue, setFormValue] = useState(initialValues);
	const { name, username, password, email } = formValue;

	/// Обработчики
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
		<div>
			<Text size='4xl'>Registration</Text>
			<TextField label='email' value={email} onChange={handleChange('email')} />
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
	);
});
