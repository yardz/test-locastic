import { Currency } from 'components/currency';
import { DisplayData } from 'components/displayDate';
import { CategoryIcon } from 'components/icon/CategoryIcon';
import { Workshop } from 'domain/workshop';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { PublicPaths } from 'routes/publicRoutes/public.paths';
import style from './workshopListItem.module.scss';
import { cartActions } from 'store/cartReducer';
import { useDevice } from 'hooks/useDevice';
import { Button } from 'components/button';

import { IconCart } from '../icon';

interface Props {
	workshop: Workshop;
}

export const WorkshopListItem: React.FC<Props> = ({ workshop }) => {
	const dispatch = useDispatch();

	const device = useDevice();

	const addToCart = () => {
		dispatch(cartActions.openCart());
		dispatch(cartActions.addItem({ ...workshop, quantity: 1 }));
	};

	return (
		<div className={style.box} data-testid={`WorkshopListItem-${workshop.id}`}>
			<div className={style.boxImage}>
				<Link to={PublicPaths.details.replace(':workshopId', workshop.id.toString())}>
					{/* <img className={style.image} src={workshop.imageUrl} alt="" /> */}
					<div className={style.image} style={{ backgroundImage: `url(${workshop.imageUrl})` }} />
				</Link>
				<div className={style.icon}>
					<CategoryIcon category={workshop.category} />
				</div>
			</div>

			<div className={style.content}>
				<DisplayData date={workshop.date} small={device === 'mobile'} />

				<Link to={PublicPaths.details.replace(':workshopId', workshop.id.toString())}>
					<h4 className={style.title}>{workshop.title}</h4>
				</Link>

				<Currency value={workshop.price} />

				{device === 'desktop' ? (
					<Button onClick={addToCart} style={{ width: '100%' }} color="Yellow">
						Add to Cart
					</Button>
				) : (
					<Button
						style={{ width: '40px', height: '40px', position: 'absolute', right: 10, bottom: 0, padding: 0 }}
						onClick={addToCart}
						color="Yellow">
						<IconCart />
					</Button>
				)}
			</div>
		</div>
	);
};
