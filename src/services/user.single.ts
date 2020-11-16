import axios from 'axios';
import to from 'await-to-js';

import { UserResponse, userMapper } from 'domain/responses/user.response';

export const userSingleService = async (id: number) => {
	const [err, data] = await to(axios.get<UserResponse>(`/users/${id}`));
	if (err) {
		throw err;
	}
	if (!!data) {
		return userMapper(data.data);
	}
};
