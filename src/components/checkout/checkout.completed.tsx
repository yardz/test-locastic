import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../button';

import { checkoutActions } from 'store/checkoutReducer';

export const CheckoutCompleted = () => {
	const dispatch = useDispatch();
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
