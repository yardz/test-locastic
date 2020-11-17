import { Button } from 'components/button';
import { Currency } from 'components/currency';
import { IconCart, IconClose } from 'components/icon';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions, cartSelectors } from 'store/cartReducer';
import style from './cartSidebar.module.scss';
import { CartSidebarItem } from './cartSidebarItem';

export const CartSidebar = () => {
	const itens = useSelector(cartSelectors.itens);
	const notification = useSelector(cartSelectors.notification);
	const dispatch = useDispatch();

	const total = itens.reduce((total, item) => total + item.quantity, 0);
	const subtotal = itens.reduce((total, item) => total + item.quantity * item.price, 0);

	let message = 'Cart is Empty';
	if (total === 1) {
		message = '1 Workshop in Cart';
	}
	if (total > 1) {
		message = `${total} Workshops in Cart`;
	}

	return (
		<div className={style.cartSidebar}>
			<div className={style.menu}>
				<div className={style.title}>
					<div className={style.cartContainer}>
						{notification && <div className={style.alert} />}
						<IconCart className={style.cart} />
						<h6 className={style.cartDescription}>{message}</h6>
					</div>
					<div
						onClick={() => {
							dispatch(cartActions.closeCart());
							dispatch(cartActions.removeNotification());
						}}>
						<IconClose />
					</div>
				</div>
				<div className={style.content}>
					{itens.map(item => (
						<CartSidebarItem key={item.id} item={item} />
					))}
				</div>
				<div className={style.checkout}>
					<h6 className={style.subtotal}>SUBTOTAL</h6>
					<Currency value={subtotal} />
					<Button onClick={() => {}} color="Blue" style={{ width: '100%' }}>
						Checkout
					</Button>
				</div>
			</div>
		</div>
	);
};
