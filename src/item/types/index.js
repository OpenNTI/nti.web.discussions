import Registry from './Registry';
import BlogEntry from './blog-entry';
import Note from './note';
import Topic from './topic';
import Fallback from './Fallback';

const typeRegistry = Registry.getInstance();
const production = process.env.NODE_ENV === 'production';

export const TYPES = {
	BlogEntry,
	Note,
	Topic
};

function getFallback () {
	if (production) { return null; }

	return Fallback;
}

export function getCardCmpFor (...args) {
	const type = typeRegistry.getItemFor(...args);

	return type && type.Card ? type.Card : getFallback();
}

export function getListItemCmpFor (...args) {
	const type = typeRegistry.getItemFor(...args);

	return type && type.ListItem ? type.ListItem : getFallback();
}