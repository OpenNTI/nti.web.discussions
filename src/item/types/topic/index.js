import Registry from '../Registry';

import Card from './Card';
import ListItem from './ListItem';

const components = {
	Card,
	ListItem,
};

Registry.registerItem(
	item => item && item.isTopic && !item.isBlogEntry,
	components
);

export default components;
