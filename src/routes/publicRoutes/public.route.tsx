import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { PublicPaths } from './public.paths';

import { Error404 } from 'pages/error/error.404.page';
import { Home } from 'pages/home/home.page';
import { Category } from 'pages/category/category.page';
import { Details } from 'pages/details/details.page';

export function PublicRoute() {
	return (
		<Switch>
			<Route exact path={PublicPaths.home} component={Home} />
			<Route exact path={PublicPaths.category} component={Category} />
			<Route exact path={PublicPaths.details} component={Details} />
			<Route exact path={PublicPaths.error404} component={Error404} />
			<Redirect to={PublicPaths.error404} />
		</Switch>
	);
}
