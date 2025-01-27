import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import style from './App.module.scss';
import { ThemeToggler } from '@consta/uikit/ThemeToggler';
import { IconSun } from '@consta/icons/IconSun';
import { IconMoon } from '@consta/icons/IconMoon';
import { IconLightningBolt } from '@consta/icons/IconLightningBolt';
import { Layout } from '@consta/uikit/Layout';
import PrivateRouteGuard from '../components/AuthRoute/PrivateRouteGuard';
import AuthPage from './authPage';
import TaskRoutePage from './TaskRoutePage';
import classNames from 'classnames';
import {
	presetGpnDark,
	presetGpnDefault,
	Theme,
	ThemePreset,
} from '@consta/uikit/Theme';
import { Button } from '@consta/uikit/Button';
import { useAppDispatch } from '../app/hooks/store';
import { getUserDataAction } from '../state/auth/actiom';
import { logout } from '../state/auth';

export enum ThemeValues {
	gpnDefault = 'gpnDefault',
	gpnDark = 'gpnDark',
}

function getPreset(themeValues: ThemeValues): ThemePreset {
	const obj = {
		gpnDefault: presetGpnDefault,
		gpnDark: presetGpnDark,
	};
	return obj[themeValues] || presetGpnDefault;
}

const getItemIcon = (item: ThemeValues) => {
	switch (item) {
		case ThemeValues.gpnDefault:
			return IconSun as any;
		case ThemeValues.gpnDark:
			return IconMoon as any;
		case item:
			return IconLightningBolt as any;
	}
};

/**
 * Корневой компонент
 */
function App() {
	const dispatch = useAppDispatch();

	const [theme, setTheme] = useState<ThemeValues>(ThemeValues.gpnDark);

	const handleThemeChange = (value: ThemeValues) => {
		setTheme(value);
	};

	//Получение данных аккаунта пользователя
	useEffect(() => {
		dispatch(getUserDataAction());
	}, []);

	// обработчик нажатия кнопки выхода из аккаунта
	const handleLogOut = () => {
		dispatch(logout());
		dispatch(getUserDataAction());
	};

	return (
		<Theme preset={getPreset(theme)} className={classNames(style.Theme)}>
			<Layout>
				<ThemeToggler
					items={[ThemeValues.gpnDefault, ThemeValues.gpnDark]}
					className={style.Theme_toggler}
					value={theme}
					getItemKey={(item: ThemeValues) => item}
					getItemLabel={(item: ThemeValues) => item}
					getItemIcon={getItemIcon}
					onChange={handleThemeChange}
					direction='downStartLeft'
				/>
				<Button
					label='Выйти из аккаунта'
					view='primary'
					onClick={() => handleLogOut()}
				/>
			</Layout>
			<Routes>
				<Route element={<PrivateRouteGuard needAuth={false} />}>
					<Route path='/auth/*' element={<AuthPage />} />
				</Route>
				<Route element={<PrivateRouteGuard needAuth={true} />}>
					<Route path='/*' element={<TaskRoutePage />} />
				</Route>
			</Routes>
		</Theme>
	);
}

export default App;
