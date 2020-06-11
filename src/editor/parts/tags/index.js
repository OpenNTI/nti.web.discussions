import {Editor} from '@nti/web-modeled-content';

export const Strategy = Editor.Tagging.BuildStrategy({
	trigger: '#',
	type: Editor.Tagging.HashTag
});