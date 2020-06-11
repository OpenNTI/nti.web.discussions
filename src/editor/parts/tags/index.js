import {Editor} from '@nti/web-modeled-content';

const trimTrigger = (t) => t.replace(/^#/, '');

export const Strategy = Editor.Tagging.BuildStrategy({
	trigger: '#',
	type: Editor.Tagging.HashTag
});

export function getData (tags) {
	if (!tags) { return null; }

	return tags.map(t => trimTrigger(t.text));
}