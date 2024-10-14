import React, { useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import {
	presetGpnDark,
	presetGpnDefault,
	presetGpnDisplay,
	Theme,
	ThemePreset,
} from '@consta/uikit/Theme';
import { ThemeToggler } from '@consta/uikit/ThemeToggler';
import { IconSun } from '@consta/icons/IconSun';
import { IconMoon } from '@consta/icons/IconMoon';
import { IconLightningBolt } from '@consta/icons/IconLightningBolt';
import { Layout } from '@consta/uikit/Layout';
import PrivateRouteGuard from '../components/AuthRoute/PrivateRouteGuard';
import { Text } from '@consta/uikit/Text';
import AuthPage from './authPage';

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
		<Theme preset={getPreset(theme)} className='Theme'>
			<Layout>
				<ThemeToggler
					items={[ThemeValues.gpnDefault, ThemeValues.gpnDark]}
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
					<Route path='/*' element={<Text>Home page</Text>} />
				</Route>
			</Routes>
		</Theme>
	);
}

export default App;
