import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import { useInfinite } from 'hooks/useInfinite';
import React from 'react';
import { store } from 'store';
import { renderPage } from 'test-utils';
import { Home } from './home.page';

jest.mock('hooks/useInfinite');

const workshops = [
	{
		id: 1,
		title: 'When you get lost in API testing',
		desc:
			"The toughest part is probably to figure out which type of tests to write and how to test some specific logic in your app - but don't give up! Paula will present a few tips she learned along the way that will hopefully make your life easier. In this talk, you will hear about different test types and when to use them, real examples based on PHPUnit and Postman, followed by some tools for checking the test quality",
		price: 350,
		date: '2021-01-26T13:51:50.417-07:00',
		category: 'backend',
		userId: 1,
		imageUrl: 'https://pbs.twimg.com/media/EREoip3XsAEPDRp.jpg',
	},
	{
		id: 2,
		title: 'YouTube for your business!',
		desc:
			'Aleksandar Ašković aka Kojot is one of the pioneers when it comes to regional YouTube expertise. His tech journey started at the age of 12 when he inserted the first coin into the arcade machine. In 1997 he becomes editor of the renowned Serbian magazine “Svet Kompjutera” and in 2001 he started his first TV show called Game Over. After that, it was time to become a bit serious so in 2019 KursorTV was born, a TV show that was covering mostly tech topics. In 2014 Aleksandar decided to make a switch in his career and dedicate his time to YouTube. During the last 5 years, he was focused on helping brands utilize this platform to a full extent. Kojot considers YouTube channel of “Sport Klub” the prime example of YouTube SEO power. Thanks to the great content and good optimization Sport Klub channel reached[masked] subscribers in under 18 months.',
		price: 400,
		date: '2020-12-26T13:51:50.417-07:00',
		category: 'marketing',
		userId: 2,
		imageUrl: 'https://pbs.twimg.com/media/EL--sgSXYAAnOX2.jpg',
	},
];

describe('home.page', () => {
	afterEach(() => {
		jest.resetAllMocks();
		cleanup();
	});

	it('show spinning when loading', async () => {
		(useInfinite as jest.Mock).mockReturnValue({
			isLoadingInitialData: true,
			isLoading: true,
			error: null,
			data: [],
		});
		renderPage(<Home />);
		screen.getByTestId('loading');
	});

	it('should display the workshops correctly', async () => {
		(useInfinite as jest.Mock).mockReturnValue({
			isLoadingInitialData: false,
			isLoading: false,
			error: null,
			data: workshops,
		});
		const { history } = renderPage(<Home />);
		expect(history.location.pathname).toEqual('/');
		await waitFor(() => screen.getByText(/When you get lost in API testing/i));
		await waitFor(() => screen.getByText(/YouTube for your business/i));
		expect(screen.getByTestId('ItensCount').textContent).toEqual('2');
		expect(screen.getByTestId('WorkshopListItem-1').textContent).toMatch(/350.00 EUR/i);
		expect(screen.getByTestId('WorkshopListItem-2').textContent).toMatch(/400.00 EUR/i);

		fireEvent.click(screen.getByText(/When you get lost in API testing/i));
		expect(history.location.pathname).toEqual('/workshop/1');
	});

	it('should not break the screen if an error occurs', async () => {
		(useInfinite as jest.Mock).mockReturnValue({
			isLoadingInitialData: false,
			isLoading: false,
			error: true,
			data: [],
		});
		renderPage(<Home />);
		expect(screen.getByTestId('ItensCount').textContent).toEqual('0');
		expect(screen.getByTestId('WorkshopList').textContent).toEqual('');
	});

	it('should add item to cart', async () => {
		(useInfinite as jest.Mock).mockReturnValue({
			isLoadingInitialData: false,
			isLoading: false,
			error: null,
			data: [workshops[0]],
		});
		renderPage(<Home />);

		expect(store.getState().cart.itens).toEqual([]);
		fireEvent.click(screen.getByText(/add to cart/i));
		expect(store.getState().cart.itens).toEqual([{ ...workshops[0], quantity: 1 }]);
		expect(store.getState().cart.isOpen).toEqual(true);
		expect(store.getState().cart.notification).toEqual(true);
	});
});
