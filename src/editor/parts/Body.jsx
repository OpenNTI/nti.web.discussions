import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { scoped } from '@nti/lib-locale';
import { Editor } from '@nti/web-modeled-content';
import { Errors } from '@nti/web-commons';

import { hasContentChanged } from '../utils';

import Styles from './Styles.css';
import {
	Strategy as MentionStrategy,
	getData as getMentionData,
} from './mentions';
import { Strategy as TagStrategy, getData as getTagsData } from './tags';
import Sharing from './sharing/List';

const cx = classnames.bind(Styles);
const t = scoped('nti-discussions.editor.parts.Body', {
	placeholder: 'Start a Discussion...',
});

const TaggingStrategies = {
	Tags: TagStrategy,
	Mentions: MentionStrategy,
};

DiscussionEditorBody.propTypes = {
	post: PropTypes.shape({
		setup: PropTypes.bool,

		body: PropTypes.array,
		setContent: PropTypes.func,

		mentions: PropTypes.array,
		lockedMentions: PropTypes.array,

		error: PropTypes.any,
		clearError: PropTypes.func,
	}),

	noSharing: PropTypes.bool,
	autoFocus: PropTypes.bool,
	placeholder: PropTypes.string,
};
export default function DiscussionEditorBody({
	post,
	noSharing,
	autoFocus,
	placeholder,
}) {
	const {
		setup,

		body,
		setContent,

		error,
		clearError,
	} = post;

	const onChange = (newBody, tags, editorState) => {
		setContent({
			body: newBody,
			mentions: getMentionData(tags.Mentions),
			tags: getTagsData(tags.Tags),
		});
	};

	const maybeClearError = !error
		? null
		: newEditorState => {
				const newBody = Editor.fromDraftState(newEditorState);

				if (hasContentChanged(newBody, body)) {
					clearError();
				}
		  };

	return (
		<div className={cx('body')}>
			{setup && !noSharing && <Sharing post={post} />}
			<Editor
				content={body}
				onContentChange={onChange}
				onChange={maybeClearError}
				taggingStrategies={TaggingStrategies}
				placeholder={placeholder ?? t('placeholder')}
				contentChangeBuffer={100}
				autoFocus={autoFocus}
			/>
			<Errors.Message error={error} className={cx('body-error')} />
		</div>
	);
}
