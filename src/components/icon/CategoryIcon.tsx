import React from 'react';

import * as Icon from '../icon';

interface Props {
	category: string;
}

export const CategoryIcon: React.FC<Props> = ({ category }) => {
	switch (category) {
		case 'backend':
			return <Icon.IconBackend />;
		case 'design':
			return <Icon.IconDesign />;
		case 'frontend':
			return <Icon.IconFrontend />;
		case 'marketing':
			return <Icon.IconMarketing />;
		default:
			return <></>;
	}
};
