import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import style from './App.module.scss'
import {
	presetGpnDark,
	presetGpnDefault,
	Theme,
	ThemePreset,
} from '@consta/uikit/Theme';
import { ThemeToggler } from '@consta/uikit/ThemeToggler';
import { IconSun } from '@consta/icons/IconSun';
import { IconMoon } from '@consta/icons/IconMoon';
import { IconLightningBolt } from '@consta/icons/IconLightningBolt';
import { Layout } from '@consta/uikit/Layout';
import PrivateRouteGuard from '../components/AuthRoute/PrivateRouteGuard';
import AuthPage from './authPage';
import TaskLinksPage from './TaskLinksPage';
import classNames from 'classnames';

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

function App() {
	const [theme, setTheme] = useState<ThemeValues>(ThemeValues.gpnDark);

	const handleThemeChange = (value: ThemeValues) => {
		setTheme(value);
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
			</Layout>
			<Routes>
				<Route element={<PrivateRouteGuard needAuth={false} />}>
					<Route path='/auth/*' element={<AuthPage />} />
				</Route>
				<Route element={<PrivateRouteGuard needAuth={true} />}>
					<Route path='/*' element={<TaskLinksPage />} />
				</Route>
			</Routes>
		</Theme>
	);
}

export default App;
