import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

export interface Item {
	id: number;
	title: string;
	price: number;
	quantity: number;
	image: string;
}
export interface Cart {
	itens: Item[];
	notification: boolean;
	isOpen: boolean;
}

const initialState: Cart = {
	itens: [],
	notification: false,
	isOpen: false,
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (state, action: PayloadAction<{ id: number; title: string; price: number; image: string; quantity?: number }>) => {
			const index = state.itens.findIndex(i => i.id === action.payload.id);
			const quantity = action.payload.quantity || 1;
			if (index >= 0) {
				state.itens[index].quantity += quantity;
				state.notification = true;
				return state;
			}
			const item: Item = { ...action.payload, quantity };
			state.itens.push(item);
			state.notification = true;
			return state;
		},
		setQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
			const index = state.itens.findIndex(i => i.id === action.payload.id);
			if (index >= 0 && action.payload.quantity > 0) {
				state.itens[index].quantity = action.payload.quantity;
			}
		},
		removeItem: (state, action: PayloadAction<{ id: number }>) => {
			const index = state.itens.findIndex(i => i.id === action.payload.id);
			if (index >= 0) {
				state.itens.splice(index, 1);
			}
		},
		removeNotification: state => {
			state.notification = false;
		},
		clear: state => {
			state.itens = [];
			state.notification = false;
		},
		openCart: state => {
			state.isOpen = true;
		},
		closeCart: state => {
			state.isOpen = false;
		},
	},
});

export const cartActions = cartSlice.actions;
export const cartSelectors = {
	itens: (state: RootState) => state.cart.itens,
	notification: (state: RootState) => state.cart.notification,
	isOpen: (state: RootState) => state.cart.isOpen,
};
