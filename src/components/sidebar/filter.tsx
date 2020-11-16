import React, { useMemo } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { PublicPaths } from 'routes/publicRoutes';

import style from './filter.module.scss';

import { categoriesListService } from 'services/categories.list';

import useSwr from 'swr';

import { CategoryIcon } from '../icon/CategoryIcon';

export const Filter = () => {
	const categories = useSwr('categories', () => categoriesListService());
	const categoriesList = useMemo(() => categories.data?.map(c => c).sort() || [], [categories.data]);

	const routeMatchHome = useRouteMatch(PublicPaths.home);
	const routeMatch = useRouteMatch<{ category: string }>(PublicPaths.category);

	return (
		<div className={style.sidebar}>
			<h6 className={style.title}>Filter by category:</h6>
			<ul className={style.list}>
				<li>
					<Link className={routeMatchHome?.isExact ? style.active : ''} to={PublicPaths.home}>
						All
					</Link>
				</li>
				{categoriesList.map(category => (
					<li key={category}>
						<Link
							className={routeMatch?.params?.category === category ? style.active : ''}
							to={PublicPaths.category.replace(':category', category)}>
							<CategoryIcon category={category} />
							{category}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};
