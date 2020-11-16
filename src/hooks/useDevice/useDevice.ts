import { useEffect, useState } from 'react';

const getSize = () => {
	return {
		width: window.innerWidth,
		height: window.innerHeight,
	};
};

const getDevice = (width: number) => {
	if (width < 576) {
		return 'mobile';
	}
	return 'desktop';
};

export type Device = 'desktop' | 'mobile';

export function useDevice(): Device {
	const [windowSize, setWindowSize] = useState(getSize());

	useEffect(() => {
		function handleResize() {
			setWindowSize(getSize());
		}
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return getDevice(windowSize.width);
}
