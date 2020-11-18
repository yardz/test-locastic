import to from 'await-to-js';
import axios from 'axios';
import { workshopMapper, WorkshopResponse } from 'domain/responses/workshop.response';

export const workshopSingleService = async (id: number) => {
	const [err, data] = await to(axios.get<WorkshopResponse>(`/workshops/${id}`));
	if (err) {
		throw err;
	}
	if (!!data) {
		return workshopMapper(data.data);
	}
};
