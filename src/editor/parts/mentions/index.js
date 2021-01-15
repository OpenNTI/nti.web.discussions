import {Editor} from '@nti/web-modeled-content';

import Suggestions from './Suggestions';
import Display from './Display';

export const Strategy = Editor.Tagging.BuildStrategy({
	trigger: '@',
	type: Editor.Tagging.Mention,
	allowWhiteSpace: true,

	suggestionKey: 'username',
	SuggestionsCmp: Suggestions,
	suggestedOnly: true,
	getSuggestionData: (suggestion) => ({username: suggestion}),

	DisplayCmp: Display,
});

export function getData (tags) {
	if (!tags) { return []; }

	return tags
		.map(t => t?.data?.username)
		.filter(Boolean);
}
