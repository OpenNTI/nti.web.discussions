import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Loading, Errors} from '@nti/web-commons';

import Styles from '../../Styles.css';
import Context from '../../Context';

import CommentDisplay from './CommentDisplay';
import CommentEditor from './CommentEditor';

const cx = classnames.bind(Styles);
const t = scoped('nti-discussions.viewer.comments.parts.comment.Comment', {
	error: 'Unable to load Comments'
});

const ReplySort = (a, b) => {
	a = a.getCreatedTime();
	b = b.getCreatedTime();

	if (a === b) { return 0;}

	return (a < b) ? -1 : 1;
};


function useFlatReplies (comment, expanded) {
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState(null);
	const [replies, setReplies] = React.useState(null);

	React.useEffect(() => {
		if (!expanded) { return; }
	
		let unmounted = false;
		let flatReplies = null;

		async function loadFlatReplies () {
			setLoading(true);
			setError(null);
			setReplies(null);

			try {
				flatReplies = await comment.getFlatDiscussions(ReplySort);
				
				if (unmounted) { return; }

				setLoading(false);
				setReplies(flatReplies);
			} catch (e) {
				setLoading(false);
				setError(e);
			}
		}

		function insertReply (reply) {
			if (reply.inReplyTo === comment.getID()) {
				flatReplies = [...flatReplies, reply];
				setReplies(flatReplies);
				return;
			}

			const parentIndex = flatReplies.findIndex(r => r.getID() === reply.inReplyTo);
			const replyDepth = reply.getDepth();

			if (parentIndex < 0) { return; }

			for (let i = parentIndex + 1; i < flatReplies.length; i++) {
				const pointer = flatReplies[i];

				if (pointer.getDepth() < replyDepth) {
					flatReplies.splice(i, 0, reply);
					flatReplies = [...flatReplies];
					setReplies(flatReplies);
					return;
				}
			}

			flatReplies = [...flatReplies, reply];
			setReplies(flatReplies);
		}

		const unsubcribe = comment.subscribeToDiscussionAdded(insertReply); 

		loadFlatReplies();

		return () => {
			unmounted = true;
			unsubcribe();
		};
	}, [comment, expanded]);

	return {
		loading,
		error,
		replies
	};
}

DiscussionComment.propTypes = {
	comment: PropTypes.shape({
		getFlatDiscussions: PropTypes.func,
		subscribeToDiscussionAdded: PropTypes.func
	})
};
export default function DiscussionComment ({comment, ...otherProps}) {
	const CommentList = React.useContext(Context);
	const isExpanded = CommentList.isExpanded(comment);

	const {loading, error, replies} = useFlatReplies(comment, isExpanded);

	return (
		<div className={cx('discussion-comment', {'expanded': isExpanded})}  >
			<CommentDisplay
				comment={comment}

				expanded={isExpanded}
				expand={() => CommentList?.expand(comment)}
				collapse={() => CommentList?.collapse(comment)}

				focused={CommentList.isFocused(comment)}
				editing={CommentList.isEditing(comment)}
				replying={CommentList.isReplying(comment)}

				{...otherProps}
			/>
			{CommentList.isReplying(comment) && (
				<CommentEditor inReplyTo={comment} />
			)}
			{isExpanded && (
				<Loading.Placeholder loading={loading} fallback={<Loading.Spinner />}>
					{error && (<Errors.Message error={t('error')} />)}
					{replies && (
						<ul className={cx('comment-list')}>
							{replies.map((reply) => (
								<li key={reply.getID()}>
									<CommentDisplay comment={reply} />
									{CommentList.isReplying(reply) && (
										<CommentEditor inReplyTo={reply} />
									)}
								</li>
							))}
						</ul>
					)}
				</Loading.Placeholder>
			)}
		</div>
	);
}