import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

export interface Auth {
	id: string | null;
	name: string | null;
	email: string | null;
	auth: 'pristine' | 'unauthenticated' | 'authenticated';
}

const initialState: Auth = {
	id: null,
	name: null,
	email: null,
	auth: 'pristine',
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<{ id: string; name: string; email: string }>) => {
			state.id = action.payload.id;
			state.email = action.payload.email;
			state.name = action.payload.name;
			state.auth = 'authenticated';
		},
		clear: state => {
			state.id = null;
			state.email = null;
			state.name = null;
			state.auth = 'unauthenticated';
		},
	},
});

export const authActions = authSlice.actions;
export const authSelectors = {
	id: (state: RootState) => state.auth.id,
	email: (state: RootState) => state.auth.email,
	authState: (state: RootState) => state.auth.auth,
};

// export const incrementAsync = (amount: number): AppThunk => dispatch => {
// 	setTimeout(() => {
// 	  dispatch(incrementByAmount(amount));
// 	}, 1000);
//   };
