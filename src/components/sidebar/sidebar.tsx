import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { PublicPaths } from 'routes/publicRoutes';

import { Filter } from './filter';
import { GoBack } from './goBack';

export const Sidebar = () => {
	const routeDetails = useRouteMatch(PublicPaths.details);
	if (!routeDetails) {
		return <Filter />;
	}
	return <GoBack />;
};
