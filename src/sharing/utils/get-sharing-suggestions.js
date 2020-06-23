function normalize (suggestions, container) {
	if (Array.isArray(suggestions)) {
		return {
			entites: suggestions,
			allowResticted: false,
			allowPrivate: false
		};
	}

	return suggestions;
}

export default async function getSharingSuggestions (discussion, container) {
	const containers = Array.isArray(container) ? container.reverse() : [container];

	for (let parent of containers) {
		if (parent.getSharingSuggestions) {
			const suggestions = await parent.getSharingSuggestions();

			return normalize(suggestions, parent);
		}
	}
}