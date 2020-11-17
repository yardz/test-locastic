import { Currency } from 'components/currency';
import { IconTrash } from 'components/icon';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { PublicPaths } from 'routes/publicRoutes';
import { cartActions, Item } from 'store/cartReducer';
import style from './cartSidebarItem.module.scss';

interface Props {
	item: Item;
}

export const CartSidebarItem: React.FC<Props> = ({ item }) => {
	const dispatch = useDispatch();
	const remove = () => {
		dispatch(cartActions.removeItem({ id: item.id }));
	};
	const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	return (
		<div className={style.cartItem} data-testid={`WorkshopListItem-${item.id}`}>
			<div className={style.boxImage}>
				<div className={style.image} style={{ backgroundImage: `url(${item.imageUrl})` }} />
			</div>

			<div className={style.content}>
				<div className={style.icon} onClick={() => remove()}>
					<IconTrash />
				</div>

				<Link to={PublicPaths.details.replace(':workshopId', item.id.toString())}>
					<h4 className={style.title}>{item.title}</h4>
				</Link>

				<div>
					<select
						onChange={e => {
							dispatch(cartActions.setQuantity({ id: item.id, quantity: Number(e.target.value) }));
						}}
						value={item.quantity}
						// defaultValue={item.quantity}
					>
						{options.map(q => (
							<option key={q} value={q}>
								{q.toString().padStart(2, '0')}
							</option>
						))}
					</select>
					<Currency value={item.price} />
				</div>
			</div>
		</div>
	);
};
