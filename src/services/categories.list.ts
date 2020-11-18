import to from 'await-to-js';
import axios from 'axios';

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
