import axios from 'axios';
import to from 'await-to-js';

import { WorkshopResponse, workshopMapper } from 'domain/responses/workshop.response';
import { ListArgs } from './list.service.type';

export const workshopListService = async (args?: ListArgs) => {
	let params = undefined;
	if (args) {
		const { page, limit, sort, filter } = args;
		params = {
			_page: page,
			_limit: limit,
			_sort: sort,
			...filter,
		};
	}

	const [err, data] = await to(
		axios.get<WorkshopResponse[]>('/workshops', { params }),
	);

	if (err) {
		throw err;
	}

	if (!data) {
		return [];
	}
	return data.data.map(workshopMapper);
};
