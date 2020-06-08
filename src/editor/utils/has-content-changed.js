const isEmptyContent = content	=> (!content || content.length === 0);

const isSameContentArray = (a, b) => {
	if (a.length !== b.length) { return false; }

	for (let i = 0; i < a.length; i++) {
		if (a[i] !== b[i]) {
			return false;
		}
	}

	return true;
};

export default function hasContentChanged (newContent, existingContent) {
	if (isEmptyContent(newContent) && isEmptyContent(existingContent)) { return false; }
	if (isEmptyContent(newContent) !== isEmptyContent(existingContent)) { return true; }
	if (typeof newContent === 'string' && newContent !== existingContent) { return true; }

	return !isSameContentArray(newContent, existingContent);
}