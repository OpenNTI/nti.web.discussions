import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Editor} from '@nti/web-modeled-content';

import Styles from './Styles.css';
import MentionSuggestions from './MentionSuggestions';

const cx = classnames.bind(Styles);
const t = scoped('nti-discussions.editor.parts.Body', {
	placeholder: 'Start a Discussion...'
});

const TaggingStrategies = [
	Editor.Tagging.BuildStrategy({
		trigger: '#',
		type: Editor.Tagging.HashTag
	}),
	Editor.Tagging.BuildStrategy({
		trigger: '@',
		type: Editor.Tagging.Mention,
		SuggestionsCmp: MentionSuggestions,
		suggestedOnly: true,
		allowWhiteSpace: true
	})
];

DiscussionEditorBody.propTypes = {
	post: PropTypes.shape({
		body: PropTypes.array,
		setBody: PropTypes.func
	})
};
export default function DiscussionEditorBody ({post}) {
	const {body, setBody} = post;

	const onChange = (newBody) => {
		setBody(newBody);
	};

	return (
		<Editor
			className={cx('body')}
			content={body}
			onContentChange={onChange}
			taggingStrategies={TaggingStrategies}
			placeholder={t('placeholder')}
		/>
	);
}