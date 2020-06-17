import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Hooks, Loading, Errors} from '@nti/web-commons';

import Styles from '../../Styles.css';

import CommentDisplay from './CommentDisplay';

const cx = classnames.bind(Styles);
const t = scoped('nti-discussions.viewer.comments.parts.comment.Comment', {
	error: 'Unable to load Comments'
});

const {useResolver} = Hooks;
const {isPending, isErrored, isResolved} = useResolver;

const ReplySort = (a, b) => {
	a = a.getCreatedTime();
	b = b.getCreatedTime();

	if (a === b) { return 0;}

	return (a < b) ? -1 : 1;
};

DiscussionComment.propTypes = {
	expanded: PropTypes.bool,
	comment: PropTypes.shape({
		getReplies: PropTypes.func
	})
};
export default function DiscussionComment ({expanded, comment, ...otherProps}) {
	const repliesResolver = useResolver(async () => {
		if (!expanded) { return null; }

		const replies = await comment.getReplies();

		return replies.sort(ReplySort);
	}, [comment, expanded]);

	const repliesLoading = isPending(repliesResolver);
	const repliesError = isErrored(repliesResolver) ? repliesResolver : null;
	const replies = isResolved(repliesResolver) ? repliesResolver : null;

	return (
		<div className={cx('discussion-comment', {expanded})} >
			<CommentDisplay comment={comment} expanded={expanded} {...otherProps} />
			{expanded && (
				<Loading.Placeholder loading={repliesLoading} fallback={<Loading.Spinner />}>
					{repliesError && (<Errors.Message error={t('error')} />)}
					{replies && (
						<ul className={cx('comment-list')}>
							{replies.map((reply) => (
								<li key={reply.getID()}>
									<DiscussionComment comment={reply} expanded {...otherProps} />
								</li>
							))}
						</ul>
					)}
				</Loading.Placeholder>
			)}
		</div>
	);
}