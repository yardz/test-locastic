import axios from 'axios';
import to from 'await-to-js';

export const categoriesListService = async (): Promise<string[]> => {
	const [err, data] = await to(axios.get<string[]>('/categories'));

	if (err) {
		throw err;
	}

	if (!data) {
		return [];
	}
	return data.data;
};
