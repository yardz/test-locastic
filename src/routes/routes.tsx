import React, { FunctionComponent } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { PublicPaths, PublicRoute } from './publicRoutes';
import { PrivatePaths, PrivateRoute } from './privateRoutes';

export const Routes: FunctionComponent = () => {
	return (
		<Switch>
			<Route exact path={Object.values(PublicPaths)} component={PublicRoute} />
			<Route exact path={Object.values(PrivatePaths)} component={PrivateRoute} />
			<Redirect to={PublicPaths.error404} />
		</Switch>
	);
};
