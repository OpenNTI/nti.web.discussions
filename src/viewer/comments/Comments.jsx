import PropTypes from 'prop-types';
import cx from 'classnames';

import { scoped } from '@nti/lib-locale';
import { Router } from '@nti/web-routing';
import { Loading, Errors } from '@nti/web-commons';

import styles from './Styles.css';
import Header from './parts/header';
import Comment from './parts/comment';
import CommentEditor from './parts/comment/CommentEditor';
import Context from './Context';
import useCommentTree from './use-comment-tree';

const t = scoped('nti-discussions.viewer.comments.Comments', {
	error: 'Unable to load Comments',
});

DiscussionComments.propTypes = {
	post: PropTypes.shape({
		getDiscussions: PropTypes.func,
		getID: PropTypes.func,
	}),
};
export default function DiscussionComments({ post }) {
	const {
		loading,
		mask,

		error,
		comments,

		currentPage,
		totalPages,
		setPage,

		expanded,
		setExpanded,

		editing,
		replying,
		setEditorState,

		focusedComment,
		focusComment,
		clearFocused,
	} = useCommentTree(post);

	const context = {
		post,

		currentPage,
		totalPages,
		setPage,

		isFocused: obj => obj && obj.getID() === focusedComment,
		focusComment,
		clearFocused,

		isExpanded: obj => obj && expanded[obj.getID()],
		expand: obj => setExpanded({ ...expanded, [obj.getID()]: true }),
		collapse: obj => {
			const clone = { ...expanded };
			delete clone[obj.getID()];
			setExpanded(clone);
		},

		setExpanded: obj => setExpanded(obj),

		isEditing: obj => obj && obj.getID() === editing,
		stopEditing: obj =>
			context.isEditing(obj) &&
			setEditorState({ editing: null, replying }),

		isReplying: obj => obj && obj.getID() === replying,
		stopReplying: obj =>
			context.isReplying(obj) &&
			setEditorState({ editing, replying: null }),
	};

	const getRouteFor = (obj, routeContext) => {
		if (!obj.isDiscussion && obj.getID() !== post.getID()) {
			return;
		}

		if (routeContext === 'edit') {
			return () =>
				setEditorState({ editing: obj.getID(), replying: null });
		} else if (routeContext === 'reply') {
			if (obj === post) {
				return {
					replace: true,
					href: './#comment',
				};
			}

			return () => {
				setEditorState({ editing: null, replying: obj.getID() });
				context.expand(obj);
			};
		}
	};

	return (
		<Context.Provider value={context}>
			<Router.RouteForProvider getRouteFor={getRouteFor}>
				<div
					className={cx('discussion-comments', 'large', {
						mask: mask,
					})}
				>
					<Header
						post={post}
						current={currentPage}
						totalPages={totalPages}
						setPage={setPage}
					/>
					<div className={cx(styles.commentsContainer)}>
						{context.isReplying(post) && (
							<CommentEditor
								inReplyTo={post}
								className="post-reply-editor"
							/>
						)}
						<Loading.Placeholder
							loading={loading}
							fallback={<Loading.Spinner />}
						>
							{error && (
								<Errors.Message
									className="error"
									error={t('error')}
								/>
							)}
							{comments && (
								<ul className={cx(styles.commentList)}>
									{comments.map(comment => {
										const id = comment.getID();

										return (
											<li key={id}>
												<Comment
													comment={comment}
													post={post}
												/>
											</li>
										);
									})}
								</ul>
							)}
						</Loading.Placeholder>
					</div>
				</div>
			</Router.RouteForProvider>
		</Context.Provider>
	);
}
