import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';

import Editor from '../../../../editor';
import Styles from '../../Styles.css';
import Context from '../../Context';

const cx = classnames.bind(Styles);
const t = scoped('nti-discussions.viewer.comments.parts.comment.CommentEditor', {
	comment: 'Comment',
	update: 'Update'
});

DiscussionCommentEditor.propTypes = {
	className: PropTypes.string,
	comment: PropTypes.object,
	inReplyTo: PropTypes.object
};
export default function DiscussionCommentEditor ({className, comment, inReplyTo}) {
	const CommentList = React.useContext(Context);

	const EditorCmp = comment ? Editor.Body : Editor.NoTitle;

	const stopEdit = () => {
		if (comment) {
			CommentList?.stopEditing(comment);
		} else if (inReplyTo) {
			CommentList?.stopReplying(inReplyTo);
		}
	};

	return (
		<EditorCmp
			className={cx('commment-editor', className, {reply: Boolean(inReplyTo)})}
			discussion={comment}
			container={([CommentList?.post, inReplyTo]).filter(Boolean)}
			saveLabel={inReplyTo ? t('update') : t('comment')}
			afterSave={stopEdit}
			onCancel={stopEdit}
		/>
	);
}