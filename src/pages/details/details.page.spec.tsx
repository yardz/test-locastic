import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import { useInfinite } from 'hooks/useInfinite';
import React from 'react';
import { store } from 'store';
import { renderPage } from 'test-utils';
import { Details } from './details.page';
import useSwr from 'swr';

jest.mock('swr');

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
	{
		title: 'Voice - The new Frontend',
		desc:
			"Nara Kasbergen knows a lot about the subject since she is the lead engineer for voice interfaces and emerging platforms at National Public Radio (NPR). We got Nara to Tinel Meetup to cover the many things she learned along the way, including what voice UI development is and isn't. We'll go over the core strategy for building a voice app for platforms like Alexa and Google using JavaScript, as well as discuss limitations of the current tech and predictions for how it will evolve in the future. Finally, she will touch upon some essential skills that a developer in this space should possess, so that you'll feel prepared to enter the voice UI space, whether you're planning to start working with it tomorrow or a decade from now.",
		price: 375,
		category: 'frontend',
		date: '2021-07-02T22:00:00.000Z',
		imageUrl: 'https://secure.meetupstatic.com/photos/event/2/d/8/e/highres_482651662.jpeg',
		userId: 4,
		id: 3,
	},
];

describe('details.page', () => {
	afterEach(() => {
		jest.resetAllMocks();
		cleanup();
	});

	it('show spinning when loading', async () => {
		(useSwr as jest.Mock).mockReturnValueOnce({
			error: null,
			data: null,
		});
		renderPage(<Details />);
		screen.getByTestId('loading');
	});

	it('should show the spinning while it has an error and has no data', async () => {
		(useSwr as jest.Mock).mockReturnValueOnce({
			error: true,
			data: null,
		});
		renderPage(<Details />);
		screen.getByTestId('loading');
	});

	it('shuld show all items correctly', async () => {
		(useSwr as jest.Mock)
			// workshop
			.mockReturnValueOnce({
				error: null,
				data: workshops[0],
			})
			// user
			.mockReturnValueOnce({
				error: null,
				data: { name: 'user test' },
			})
			// similar workshops
			.mockReturnValueOnce({
				error: null,
				data: [workshops[1], workshops[2]],
			});
		renderPage(<Details />);
		screen.getByText(/When you get lost in API testing/i);
		screen.getByText(/Subtotal: 350.00 EUR/i);

		expect(screen.getByTestId('detail-price').textContent).toMatch(/350.00/i);
		expect(screen.getByTestId('detail-meta').textContent).toMatch(/26.01.2021/i);
		expect(screen.getByTestId('detail-meta').textContent).toMatch(/17:51h/i);

		expect(screen.getByTestId('detail-with').textContent).toEqual('WITH: user test');

		//similar workshops
		await waitFor(() => screen.getByText(/YouTube for your business/i));
		await waitFor(() => screen.getByText(/Voice - The new Frontend/i));
		expect(screen.getByTestId('WorkshopListItem-2').textContent).toMatch(/400.00 EUR/i);
		expect(screen.getByTestId('WorkshopListItem-3').textContent).toMatch(/375.00 EUR/i);
	});

	it('should not show Similar Workshops if there is no one', async () => {
		(useSwr as jest.Mock)
			// workshop
			.mockReturnValueOnce({
				error: null,
				data: workshops[0],
			})
			// user
			.mockReturnValueOnce({
				error: null,
				data: { name: 'user test' },
			})
			// similar workshops
			.mockReturnValueOnce({
				error: null,
				data: [],
			});
		renderPage(<Details />);

		//similar workshops
		await waitFor(() => {
			expect(screen.queryByText(/Similar Workshops/i)).not.toBeInTheDocument();
		});
	});

	it('should add to cart', async () => {
		(useSwr as jest.Mock)
			// workshop
			.mockReturnValueOnce({
				error: null,
				data: workshops[0],
			})
			// user
			.mockReturnValueOnce({
				error: null,
				data: { name: 'user test' },
			})
			// similar workshops
			.mockReturnValueOnce({
				error: null,
				data: [],
			});
		renderPage(<Details />);

		expect(store.getState().cart.itens).toEqual([]);
		fireEvent.click(screen.getByText(/icon-cart.svg/i));
		expect(store.getState().cart.itens).toEqual([{ ...workshops[0], quantity: 1 }]);
		expect(store.getState().cart.isOpen).toEqual(false);
		expect(store.getState().cart.notification).toEqual(true);
	});
});
