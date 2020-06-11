import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Editor} from '@nti/web-modeled-content';

import Styles from './Styles.css';
import {Strategy as MentionStrategy, getData as getMentionData} from './mentions';
import {Strategy as TagStrategy, getData as getTagsData} from './tags';

const cx = classnames.bind(Styles);
const t = scoped('nti-discussions.editor.parts.Body', {
	placeholder: 'Start a Discussion...'
});


const TaggingStrategies = {
	Tags: TagStrategy,
	Mentions: MentionStrategy
};

DiscussionEditorBody.propTypes = {
	post: PropTypes.shape({
		body: PropTypes.array,
		setBody: PropTypes.func,
		setMentions: PropTypes.func,
		setTags: PropTypes.func
	})
};
export default function DiscussionEditorBody ({post}) {
	const {
		body,
		setBody,

		// mentions,
		setMentions,

		// tags,
		setTags
	} = post;

	const onChange = (newBody, tags, editorState) => {
		setBody(newBody);
		setMentions(getMentionData(tags.Mentions));
		setTags(getTagsData(tags.Tags));
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