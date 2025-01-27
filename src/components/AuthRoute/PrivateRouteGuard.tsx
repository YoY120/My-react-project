import React from 'react';
import { FC, memo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Navigate, Outlet } from 'react-router';

export interface PrivateRouteGuardProps {
	needAuth: boolean;
}

const getRedirectPath = (authStatus: boolean) =>
	(authStatus ? '/auth/SignIn' : '/') as string;

const PrivateRouteGuard: FC<PrivateRouteGuardProps> = memo(
	function PrivateRouteGuard({ needAuth }) {
		const authStatus = useSelector<RootState>(state => state.auth.isAuth);
		console.log(`PrivateRouteGuardProps ${needAuth}`);

		if (needAuth !== authStatus)
			return <Navigate to={getRedirectPath(needAuth)} replace />;
		return <Outlet />;
	}
);

PrivateRouteGuard.displayName = 'PrivateRouteGuard';

export default PrivateRouteGuard;
