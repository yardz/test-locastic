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
import { IconCart } from '../icon';

interface Props {
	workshop: Workshop;
}

export const WorkshopListItem: React.FC<Props> = ({ workshop }) => {
	const dispatch = useDispatch();

	const device = useDevice();

	const addToCart = () => {
		dispatch(cartActions.addItem({ id: workshop.id, price: workshop.price, title: workshop.title, image: workshop.imageUrl, quantity: 1 }));
	};

	return (
		<div className={style.box} data-testid={`WorkshopListItem-${workshop.id}`}>
			<div className={style.boxImage}>
				<img className={style.image} src={workshop.imageUrl} alt="" />

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
					<button onClick={addToCart}>Add to Cart</button>
				) : (
					<button onClick={addToCart}>
						<IconCart />
					</button>
				)}
			</div>
		</div>
	);
};
