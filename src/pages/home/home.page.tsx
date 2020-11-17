import React from 'react';
import dayjs from 'dayjs';
import { workshopListService } from 'services/workshop.list';

import { useInfinite } from 'hooks/useInfinite';

import { LoadMore } from 'components/loadMore';
import { Loading } from 'components/loading';
import { PageTitle } from 'components/pageTitle';
import { ItensCount } from 'components/itensCount';

import { WorkshopList } from 'components/workshopList';

export const Home = () => {
	const date_gte = dayjs().toISOString(); // today
	const swr = useInfinite(['workshopListService'], workshopListService, { limit: 9, sort: 'date', filter: { date_gte } });

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
