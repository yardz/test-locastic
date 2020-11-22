import { useMemo } from 'react';
import { ListArgs } from 'services/list.service.type';
import { useSWRInfinite } from 'swr';

interface Options extends Omit<ListArgs, 'page'> {
	limit: number;
	initialPage?: number;
}

// tslint:disable-next-line: no-any
export const useInfinite = <T>(key: string | any[], serviceList: (args?: ListArgs) => Promise<T[]>, options: Options) => {
	const { limit } = options;
	const { initialPage, ...args } = options;

	const getKey = (page: number, previousPageData: T[] | null) => {
		const k = typeof key === 'string' ? [key] : key;
		if (previousPageData && !previousPageData.length) return null;
		return [page, ...k, ...Object.keys(options)];
	};

	const { error, data, size, setSize } = useSWRInfinite(getKey, (page: number) => serviceList({ ...args, page: page + 1 }), {
		initialSize: initialPage ? initialPage : 1,
		persistSize: true,
	});
	const itens = useMemo(() => {
		if (!data) {
			return [];
		}
		return data.reduce((prev, curr) => prev.concat(curr), []);
	}, [data]);

	const total = limit * size;

	const hasNextPage = total === itens.length;

	const nextPage = () => {
		if (hasNextPage) {
			setSize(size + 1).catch(() => console.log('error'));
		}
	};

	const prevPage = () => {
		if (size !== 1) {
			setSize(size - 1).catch(() => console.log('error'));
		}
	};

	const isLoadingInitialData = !data && !error;
	const isLoading = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined');

	return { error, data: itens, page: size, isLoadingInitialData, isLoading, hasNextPage, nextPage, prevPage };
};
