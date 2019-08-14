import Registry from './Registry';
import Topic from './topic';

const typeRegistry = Registry.getInstance();

export const TYPES = {
	Topic
};

export function getCardCmpFor (...args) {
	const type = typeRegistry.getItemFor(...args);

	return type && type.Card ? type.Card : null;
}

export function getListItemCmpFor (...args) {
	const type = typeRegistry.getItemFor(...args);

	return type && type.ListItem ? type.ListItem : null;
}