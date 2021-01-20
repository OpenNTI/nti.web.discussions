
const empty = x => !x || x === '';
const safe = (x) => !x ? '' : x.toLowerCase();
const contains = (x, y) => Boolean(~safe(x).indexOf(safe(y)));

export function filterItemsBySearchTerm (items, searchTerm) {
	const search = searchTerm?.toLowerCase();
	return items?.filter(item =>
		item && (empty(searchTerm) || contains(item.title, search))
	);
}
