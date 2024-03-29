import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { scoped } from '@nti/lib-locale';
import { Loading, Errors, Hooks } from '@nti/web-commons';
import { useForceUpdate } from '@nti/web-core';

import Styles from '../../Styles.css';
import Context from '../../Context';

import CommentDisplay from './CommentDisplay';
import CommentEditor from './CommentEditor';

const cx = classnames.bind(Styles);
const t = scoped('nti-discussions.viewer.comments.parts.comment.Comment', {
	error: 'Unable to load Comments',
});

const { useResolver } = Hooks;
const { isPending, isResolved, isErrored } = useResolver;

const MaxDepth = 3;

const ReplySort = (a, b) => {
	a = a.getCreatedTime();
	b = b.getCreatedTime();

	if (a === b) {
		return 0;
	}

	return a < b ? -1 : 1;
};

function useDiscussionTree(comment, expanded) {
	const forceUpdate = useForceUpdate();

	const treeResolver = useResolver(async () => {
		if (!expanded) {
			return null;
		}

		return comment.getDiscussionTree(ReplySort);
	}, [comment, expanded]);

	const loading = isPending(treeResolver);
	const error = isErrored(treeResolver) ? treeResolver : null;
	const tree = isResolved(treeResolver) ? treeResolver : null;

	useEffect(() => {
		if (!tree) {
			return;
		}

		return tree.subscribeToUpdates(forceUpdate);
	}, [tree]);

	return {
		loading,
		error,
		tree,
	};
}

SubTree.propTypes = {
	tree: PropTypes.shape({
		children: PropTypes.array,
		depth: PropTypes.number,
	}),
	inReplyTo: PropTypes.object,
	post: PropTypes.any,
};
function SubTree({ tree, inReplyTo, post }) {
	const CommentList = useContext(Context);
	const children = tree?.children ?? [];

	if (children.length === 0) {
		return null;
	}

	return (
		<ul
			className={cx(
				'reply-tree',
				`depth-${Math.min(MaxDepth, tree.depth)}`
			)}
		>
			{children.map(child => {
				const { node } = child;

				return (
					<li key={node.getID()}>
						<CommentDisplay
							comment={node}
							post={post}
							inReplyTo={inReplyTo}
							tooDeep={tree.depth > MaxDepth}
							focused={CommentList.isFocused(node)}
							editing={CommentList.isEditing(node)}
							replying={CommentList.isReplying(node)}
							afterDelete={CommentList.clearFocused}
						/>
						{CommentList.isReplying(node) && (
							<CommentEditor inReplyTo={node} />
						)}
						<SubTree tree={child} inReplyTo={node} post={post} />
					</li>
				);
			})}
		</ul>
	);
}

DiscussionComment.propTypes = {
	comment: PropTypes.shape({
		getFlatDiscussions: PropTypes.func,
		subscribeToDiscussionAdded: PropTypes.func,
	}),

	post: PropTypes.any,
};
export default function DiscussionComment({ comment, post, ...otherProps }) {
	const CommentList = useContext(Context);
	const isExpanded = CommentList.isExpanded(comment);

	const { loading, error, tree } = useDiscussionTree(comment, isExpanded);

	return (
		<div className={cx('discussion-comment', { expanded: isExpanded })}>
			<CommentDisplay
				comment={comment}
				post={post}
				expanded={isExpanded}
				expand={() => CommentList?.expand(comment)}
				collapse={() => CommentList?.collapse(comment)}
				focused={CommentList.isFocused(comment)}
				editing={CommentList.isEditing(comment)}
				replying={CommentList.isReplying(comment)}
				afterDelete={CommentList.clearFocused}
				{...otherProps}
			/>
			{CommentList.isReplying(comment) && (
				<CommentEditor inReplyTo={comment} />
			)}
			{isExpanded && (
				<Loading.Placeholder
					loading={loading}
					fallback={<Loading.Spinner />}
				>
					{error && <Errors.Message error={t('error')} />}
					<SubTree tree={tree} post={post} />
				</Loading.Placeholder>
			)}
		</div>
	);
}
