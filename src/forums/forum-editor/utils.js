export const getPrefix = (title = '') => {
	const found = title.match(/^(open|in-class)/i);
	return (found && found[0]) || null;
};

export const removePrefix = (title = '') => title.replace(/^(open|in-class)/i, '').trim();
