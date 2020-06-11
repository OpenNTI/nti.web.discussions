import {Editor} from '@nti/web-modeled-content';

import Suggestions from './Suggestions';
import Display from './Display';

export const Strategy = Editor.Tagging.BuildStrategy({
	trigger: '@',
	type: Editor.Tagging.Mention,
	SuggestionsCmp: Suggestions,
	suggestedOnly: true,
	allowWhiteSpace: true,
	getDisplayText: (mention) => mention.displayName,
	DisplayCmp: Display
});