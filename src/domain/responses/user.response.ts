import { User } from '../user';

export interface UserResponse {
	password: string;
	id: number;
	name: string;
	email: string;
}

export const userMapper = (input: UserResponse): User => {
	const { id, name, email } = input;
	return { id, name, email };
};
