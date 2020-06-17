import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {LinkTo} from '@nti/web-routing';
import {User, DateTime, Text, List} from '@nti/web-commons';

import Styles from '../../Styles.css';
import Body from '../../../body';
import {Controls} from '../../../../item';

const cx = classnames.bind(Styles);
const t = scoped('nti-discussions.viewer.commments.parts.comment.CommentDisplay', {
	comments: {
		one: '%(count)s Comment',
		other: '%(count)s Comments'
	},
	comment: 'Reply',
	deleted: 'This comment has been deleted'
});

CommentDisplay.propTypes = {
	comment: PropTypes.shape({
		creator: PropTypes.any,
		getCreatedTime: PropTypes.func,
		getDepth: PropTypes.func,
		getCommentCount: PropTypes.func,
		Deleted: PropTypes.bool
	}),

	expanded: PropTypes.bool,
	expand: PropTypes.func,
	collapse: PropTypes.func
};
export default function CommentDisplay ({comment, expanded, expand, collapse}) {
	const user = User.useUser(comment.creator);
	const depth = comment.getDepth();
	const commentCount = comment.getCommentCount();

	if (comment.Deleted) {
		return (
			<div className={cx('comment-display', 'deleted', `depth-${depth}`)}>
				<Text.Base>
					{t('deleted')}
				</Text.Base>
			</div>
		);
	}

	return (
		<div className={cx('comment-display', 'active', `depth-${depth}`)}>
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
				<DateTime date={comment.getCreatedTime()} relative className={cx('created')} />
			</div>
			<Body className={cx('comment-body')} post={comment} />
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
			</List.SeparatedInline>
		</div>
	);
}