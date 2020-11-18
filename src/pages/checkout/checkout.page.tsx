import { CheckoutCompleted } from 'components/checkout/checkout.completed';
import { CheckoutForm } from 'components/checkout/checkout.form';
import { IconClose } from 'components/icon';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkoutActions, checkoutSelectors } from 'store/checkoutReducer';
import style from './checkout.page.module.scss';

export const Checkout = () => {
	const dispatch = useDispatch();
	const isComplete = useSelector(checkoutSelectors.isComplete);

	return (
		<div className={style.modal}>
			<div className={style.box}>
				<div className={style.container}>
					<div className={style.header}>
						<h2>{!isComplete ? 'Checkout' : 'Thank you!'}</h2>
						<div
							onClick={() => {
								dispatch(checkoutActions.close());
							}}>
							<IconClose />
						</div>
					</div>
					<h6 className={style.description}>What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing.</h6>
					{!isComplete ? <CheckoutForm /> : <CheckoutCompleted />}
				</div>
			</div>
		</div>
	);
};
