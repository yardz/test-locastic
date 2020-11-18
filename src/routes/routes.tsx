import React, { FunctionComponent } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { PublicPaths, PublicRoute } from './publicRoutes';

export const Routes: FunctionComponent = () => {
	return (
		<Switch>
			<Route exact path={Object.values(PublicPaths)} component={PublicRoute} />
			<Redirect to={PublicPaths.error404} />
		</Switch>
	);
};
