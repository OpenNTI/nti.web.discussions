import {Editor} from '@nti/web-modeled-content';

const trimTrigger = (t) => t.replace(/^#/, '');

const ValidCharsRegex = /^[a-z0-9]+$/i;

export const Strategy = Editor.Tagging.BuildStrategy({
	trigger: '#',
	type: Editor.Tagging.HashTag,
	isValidCharacters: (chars) => ValidCharsRegex.test(chars)
});

export function getData (tags) {
	if (!tags) { return []; }

	return tags.map(t => trimTrigger(t.text));
}