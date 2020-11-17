import { Workshop } from './workshop';

interface Product extends Workshop {
	quantity: number;
}

export interface Order {
	products: Product[];
	total: number;
	id: number;
}
