import { IconCart, IconClose } from 'components/icon';
import { Button } from 'components/button';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartSelectors, cartActions } from 'store/cartReducer';
import style from './cartSidebar.module.scss';
interface Props {
	close: () => void;
}

export const CartSidebar: React.FC<Props> = ({ close }) => {
	const itens = useSelector(cartSelectors.itens);
	const notification = useSelector(cartSelectors.notification);
	const dispatch = useDispatch();

	const total = itens.reduce((total, item) => total + item.quantity, 0);

	let message = 'Cart is Empty';
	if (total === 1) {
		message = '1 Workshop in Cart';
	}
	if (total > 1) {
		message = `${total} Workshops in Cart`;
	}

	useEffect(() => {
		if (notification) {
			dispatch(cartActions.removeNotification());
		}
	}, [dispatch, notification]);

	return (
		<div className={style.cartSidebar}>
			<div className={style.menu}>
				<div className={style.title}>
					<div className={style.cartContainer}>
						<IconCart className={style.cart} />
						<h6 className={style.cartDescription}>{message}</h6>
					</div>
					<div onClick={() => close()}>
						<IconClose />
					</div>
				</div>
				<div className={style.content}></div>
				<div className={style.checkout}>
					<Button onClick={() => {}} color="Blue" style={{ width: '100%' }}>
						Checkout
					</Button>
				</div>
			</div>
		</div>
	);
};
