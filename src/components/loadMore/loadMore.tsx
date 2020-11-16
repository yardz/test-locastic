import React from 'react';

import { Loading } from '../loading';

import styles from './loadMore.module.scss';

interface Props {
	load: () => void;
	loading?: boolean;
}

export const LoadMore: React.FC<Props> = ({ load, loading }) => {
	if (loading) {
		return <Loading />;
	}
	return (
		<div className={styles.container}>
			<button
				onClick={() => {
					load();
				}}>
				Load More
			</button>
		</div>
	);
};
