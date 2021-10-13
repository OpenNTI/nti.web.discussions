import { useContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { scoped } from '@nti/lib-locale';
import { Events } from '@nti/web-session';
import { StandardUI } from '@nti/web-commons';

import Editor from '../../../../editor';
import Styles from '../../Styles.css';
import Context from '../../Context';

const cx = classnames.bind(Styles);
const t = scoped(
	'nti-discussions.viewer.comments.parts.comment.CommentEditor',
	{
		comment: 'Comment',
		update: 'Update',
		placeholder: 'Share your thoughts...',
	}
);

function getSessionNotifier(comment) {
	return newComment => {
		let event = null;

		if (newComment.isNote) {
			event = comment ? Events.NOTE_UPDATED : Events.NOTE_CREATED;
		} else if (newComment.isComment) {
			event = comment
				? Events.TOPIC_COMMENT_UPDATED
				: Events.TOPIC_COMMENT_CREATED;
		}

		if (event) {
			Events.emit(event, newComment);
		}
	};
}

DiscussionCommentEditor.propTypes = {
	className: PropTypes.string,
	comment: PropTypes.object,
	inReplyTo: PropTypes.object,
};
export default function DiscussionCommentEditor({
	className,
	comment,
	inReplyTo,
}) {
	const CommentList = useContext(Context);

	const EditorCmp = comment ? Editor.Body : Editor.NoTitle;

	const sessionNotify = getSessionNotifier(comment);

	const focusComment = updated => {
		if (comment === updated) {
			return;
		}

		CommentList.focusComment(updated);
	};

	const stopEdit = () => {
		if (comment) {
			CommentList?.stopEditing(comment);
		} else if (inReplyTo) {
			CommentList?.stopReplying(inReplyTo);
		}
	};

	return (
		<StandardUI.Card
			className={cx('comment-editor', className, {
				reply: Boolean(inReplyTo),
			})}
			rounded
		>
			<EditorCmp
				discussion={comment}
				container={inReplyTo ?? CommentList.post}
				noSharing
				saveLabel={comment ? t('update') : t('comment')}
				afterSave={newComment => (
					stopEdit(),
					focusComment(newComment),
					sessionNotify(newComment)
				)}
				onCancel={stopEdit}
				bodyPlaceholder={t('placeholder')}
			/>
		</StandardUI.Card>
	);
}
