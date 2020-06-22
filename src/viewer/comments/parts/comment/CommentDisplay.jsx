import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {LinkTo} from '@nti/web-routing';
import {User, DateTime, Text, List} from '@nti/web-commons';

import Styles from '../../Styles.css';
import Body from '../../../body';
import {Controls} from '../../../../item';

import CommentEditor from './CommentEditor';

const cx = classnames.bind(Styles);
const t = scoped('nti-discussions.viewer.commments.parts.comment.CommentDisplay', {
	comments: {
		one: '%(count)s Comment',
		other: '%(count)s Comments'
	},
	comment: 'Reply',
	deleted: 'This comment has been deleted',
	repliedTo: 'Replied to %(name)s'
});


CommentDisplay.propTypes = {
	comment: PropTypes.shape({
		Deleted: PropTypes.bool,
		creator: PropTypes.any,
		getCreatedTime: PropTypes.func,
		getDiscussionCount: PropTypes.func,
		canAddDiscussion: PropTypes.func,
		subscribeToChange: PropTypes.func
	}),

	inReplyTo: PropTypes.object,
	tooDeep: PropTypes.bool,

	expanded: PropTypes.bool,
	expand: PropTypes.func,
	collapse: PropTypes.func,

	focused: PropTypes.bool,
	editing: PropTypes.bool
};
export default function CommentDisplay ({comment, inReplyTo, tooDeep, expanded, expand, collapse, focused, editing}) {
	const afterRender = React.useRef(null);

	const user = User.useUser(comment.creator);
	const commentCount = comment.getDiscussionCount();

	if (comment.Deleted) {
		return (
			<div className={cx('comment-display', 'deleted')}>
				<Text.Base>
					{t('deleted')}
				</Text.Base>
			</div>
		);
	}

	React.useEffect(() => {
		if (focused) {
			afterRender.current = (body) => {
				body?.scrollIntoView?.();
				afterRender.current = null;
			};
		}
	}, [focused]);

	return (
		<div className={cx('comment-display', 'full')}>
			<Controls item={comment} className={cx('controls')} />
			<div className={cx('identity')}>
				<User.Avatar user={comment.creator} />
			</div>
			<div className={cx('comment-info')}>
				{user && (
					<LinkTo.Object object={user} className={cx('display-name')}>
						<User.DisplayName user={user} />
					</LinkTo.Object>
				)}
				{!tooDeep && (<DateTime date={comment.getCreatedTime()} relative className={cx('created')} />)}
				{tooDeep && (
					<LinkTo.Object object={inReplyTo} className={cx('in-reply-to')}>
						<User.DisplayName user={inReplyTo?.creator} localeKey={d => t('repliedTo', d)} />
					</LinkTo.Object>
				)}
			</div>
			{!editing && (
				<Body
					className={cx('comment-body')}
					post={comment}
					afterRender={(cmp) => afterRender.current?.(cmp)}
				/>
			)}
			{editing && (
				<CommentEditor
					className={cx('comment-body')}
					comment={comment}
				/>
			)}
			<List.SeparatedInline className={cx('comment-replies')}>
				{(expand || collapse) && (
					<Text.Base
						className={cx('comment-count', {'has-comments': commentCount > 0})}
						onClick={
							commentCount <= 0 ?
								null :
								(expanded ? collapse : expand)
						}
					>
						{t('comments', {count: commentCount})}
					</Text.Base>
				)}
				{comment.canAddDiscussion() && (
					<LinkTo.Object object={comment} context="reply" className={cx('reply')}>
						<Text.Base>
							{t('comment')}
						</Text.Base>
					</LinkTo.Object>
				)}
			</List.SeparatedInline>
		</div>
	);
}