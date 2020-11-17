import { configureStore, ThunkAction, Action, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// slices
import { authSlice } from './authReducer';
import { cartSlice } from './cartReducer';
import { checkoutSlice } from './checkoutReducer';

const reducers = combineReducers({
	auth: authSlice.reducer,
	cart: cartSlice.reducer,
	checkout: checkoutSlice.reducer,
});

const persistConfig = {
	key: 'root',
	version: 1,
	storage,
	blacklist: ['auth'],
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
		},
	}),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
