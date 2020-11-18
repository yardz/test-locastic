import { ItensCount } from 'components/itensCount';
import { Loading } from 'components/loading';
import { LoadMore } from 'components/loadMore';
import { PageTitle } from 'components/pageTitle';
import { WorkshopList } from 'components/workshopList';
import dayjs from 'dayjs';
import { useInfinite } from 'hooks/useInfinite';
import React from 'react';
import { useParams } from 'react-router-dom';
import { workshopListService } from 'services/workshop.list';

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
			{swr.error && <LoadMore loading={swr.isLoading} load={swr.nextPage} />}
		</>
	);
};
