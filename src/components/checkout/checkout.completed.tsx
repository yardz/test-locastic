import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../button';

import { checkoutActions } from 'store/checkoutReducer';
import { cartActions } from 'store/cartReducer';

export const CheckoutCompleted = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(cartActions.clear());
	}, [dispatch]);
	return (
		<>
			<Button
				color="Yellow"
				style={{ width: 200 }}
				onClick={() => {
					dispatch(checkoutActions.close());
				}}>
				Back to Shop
			</Button>
		</>
	);
};
