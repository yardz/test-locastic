import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { PrivatePaths } from './private.paths';
import { PublicPaths } from '../publicRoutes/public.paths';

import { useAuth } from 'hooks/useAuth';

import { Loading } from 'components/loading';
import { CheckoutCompleted } from 'pages/checkout/checkout.completed.page';

export function PrivateRoute() {
	const auth = useAuth();

	if (auth === 'pristine') {
		return <Route exact path={PrivatePaths.checkoutCompleted} component={Loading} />;
	}

	if (auth === 'unauthenticated') {
		return <Redirect to={PublicPaths.register} />;
	}

	return (
		<Switch>
			<Route exact path={PrivatePaths.checkoutCompleted} component={CheckoutCompleted} />
		</Switch>
	);
}
