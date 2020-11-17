import React from 'react';

import { workshopListService } from 'services/workshop.list';

import { useInfinite } from 'hooks/useInfinite';

import { LoadMore } from 'components/loadMore';
import { Loading } from 'components/loading';
import { PageTitle } from 'components/pageTitle';
import { ItensCount } from 'components/itensCount';

import { WorkshopList } from 'components/workshopList';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

const date_gte = dayjs().toISOString(); // today

export const Category = () => {
	const { category } = useParams<{ category: string }>();
	const swr = useInfinite(['workshopListService', category], workshopListService, {
		limit: 9,
		sort: 'date',
		filter: { category, date_gte },
	});

	if (swr.isLoadingInitialData) {
		return <Loading />;
	}

	return (
		<>
			<PageTitle>Workshops</PageTitle>
			<ItensCount itens={swr.isLoading ? 0 : swr.data.length} />
			<WorkshopList workshops={swr.data} />
			<LoadMore loading={swr.isLoading} load={swr.nextPage} />
		</>
	);
};
