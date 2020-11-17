import React from 'react';
import { useParams } from 'react-router-dom';
import useSwr from 'swr';

import { workshopSingleService } from 'services/workshop.single';
import { userSingleService } from 'services/user.single';

import { WorkshopDetails } from 'components/workshopDetails';
import { Loading } from 'components/loading';
import { workshopListService } from 'services/workshop.list';
import dayjs from 'dayjs';

const date_gte = dayjs().toISOString(); // today

export const Details = () => {
	const { workshopId } = useParams<{ workshopId: string }>();
	const id = Number(workshopId);

	const workshop = useSwr(
		() => (!isNaN(id) ? ['workshopSingleService', id] : null),
		() => workshopSingleService(id),
	);

	const user = useSwr(
		() => (workshop.data ? ['userSingleService', workshop.data.id] : null),
		() => (workshop.data ? userSingleService(workshop.data.userId) : undefined),
	);

	const category = workshop.data?.category || '';

	const similarWorkshops = useSwr(
		() => (!isNaN(id) && workshop.data ? ['workshopListService', id] : null),
		() =>
			workshopListService({
				limit: 3,
				sort: 'date',
				filter: { category, date_gte, id_ne: `${id}` },
			}),
	);

	if (workshop.error) {
		// error
		console.log('TRATAR ERRO');
	}
	if (!workshop.data) {
		return <Loading />;
	}

	return <WorkshopDetails workshop={workshop.data} user={user.data} similarWorkshops={similarWorkshops.data} />;
};
