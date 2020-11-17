import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../cartReducer';
import { Order } from 'domain/order';
import { RootState } from 'store';

export interface Checkout {
	products: Item[];
	total: number;
	isComplete: boolean;
	isOpen: boolean;
}

const initialState: Checkout = {
	products: [],
	total: 0,
	isComplete: false,
	isOpen: false,
};

export const checkoutSlice = createSlice({
	name: 'checkout',
	initialState,
	reducers: {
		start: (state, action: PayloadAction<Item[]>) => {
			const total = action.payload.reduce((t, i) => t + i.quantity * i.price, 0);
			state.isComplete = false;
			state.products = action.payload;
			state.total = total;
			state.isOpen = true;
			return state;
		},
		done: state => {
			state.isComplete = true;
		},
		close: state => {
			state.isComplete = false;
			state.products = [];
			state.total = 0;
			state.isOpen = false;
		},
	},
});

export const checkoutActions = checkoutSlice.actions;
export const checkoutSelectors = {
	isOpen: (state: RootState) => state.checkout.isOpen,
	isComplete: (state: RootState) => state.checkout.isComplete,
	getOrder: (state: RootState): Omit<Order, 'id'> => ({
		products: state.checkout.products,
		total: state.checkout.total,
	}),
};
