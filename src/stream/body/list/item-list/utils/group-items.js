import { DefaultGroup } from '../Constants';

export default function groupItems(items, grouper) {
	if (!grouper || typeof grouper !== 'function') {
		return [{ name: DefaultGroup, items }];
	}

	const groups = {};
	const groupOrder = [];

	for (let item of items) {
		const group = grouper(item);

		if (groups[group]) {
			groups[group].items.push(item);
		} else {
			groups[group] = { name: group, items: [item] };
			groupOrder.push(group);
		}
	}

	return groupOrder.map(group => groups[group]);
}
