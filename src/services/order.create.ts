import axios from 'axios';
import to from 'await-to-js';

import { Order } from 'domain/order';
import { UserCheckout } from 'domain/checkout';

interface Args {
	user: UserCheckout; // will be used in the future.
	order: Omit<Order, 'id'>;
}
export const orderCreateService = async ({ order }: Args) => {
	const id = new Date().getTime();
	const [err] = await to(axios.post(`/orders/`, { ...order, id }));
	if (err) {
		throw err;
	}
};
