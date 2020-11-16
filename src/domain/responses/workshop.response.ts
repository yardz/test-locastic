import { Workshop } from '../workshop';

import dayjs from 'dayjs';

export interface WorkshopResponse {
	id: number;
	title: string;
	desc: string;
	price: number;
	date: string;
	category: string;
	userId: number;
	imageUrl: string;
}

export const workshopMapper = (input: WorkshopResponse): Workshop => {
	// I can do this, but if the API returns more fields, these fields will be passed to my application. This is something i don't want.
	// return { ...input, date: dayjs(input.date).unix() * 1000 };

	// So... Deconstruc to remove additional fields
	const { id, title, desc, price, date, category, userId, imageUrl } = input;
	return {
		id,
		title,
		desc,
		price,
		category,
		userId,
		imageUrl,
		date: dayjs(date).unix() * 1000,
	};
};
