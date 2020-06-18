import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Router} from '@nti/web-routing';
import {Loading, Errors} from '@nti/web-commons';

import Styles from './Styles.css';
import Header from './parts/header';
import Comment from './parts/comment';
import CommentEditor from './parts/comment/CommentEditor';
import Context from './Context';
import useCommentTree from './use-coment-tree';

const cx = classnames.bind(Styles);
const t = scoped('nti-discussions.viewer.comments.Comments', {
	error: 'Unable to load Comments'
});


DiscussionComments.propTypes = {
	post: PropTypes.shape({
		getDiscussions: PropTypes.func,
		getID: PropTypes.func
	})
};
export default function DiscussionComments ({post}) {
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

		focusedComment,
		focusComment
	} = useCommentTree(post);

	const [editing, setEditing] = React.useState(null);
	const [replying, setReplying] = React.useState(null);

	const getRouteFor = (obj, context) => {
		if (!obj.isComment && obj.getID() !== post.getID()) { return; }

		if (context === 'edit') {
			return () => (setEditing(obj.getID()), setReplying(null));
		} else if (context === 'reply') {
			return () => (setEditing(null), setReplying(obj.getID()));
		}
	};

	const context = {
		post,

		isFocused: (obj) => obj && obj.getID() === focusedComment,
		focusComment,

		isExpanded: (obj) => obj && expanded[obj.getID()],
		expand: (obj) => setExpanded({...expanded, [obj.getID()]: true}),
		collapse: (obj) => {
			const clone = {...expanded};
			delete clone[obj.getID()];
			setExpanded(clone);
		},

		setExpanded: (obj) => setExpanded(obj),

		isEditing: (obj) => obj && obj.getID() === editing,
		stopEditing: (obj) => context.isEditing(obj) && setEditing(null),
		
		isReplying: (obj) => obj && obj.getID() === replying,
		stopReplying: (obj) => context.isReplying(obj) && setReplying(null)
	};

	return (
		<Context.Provider value={context}>
			<Router.RouteForProvider getRouteFor={getRouteFor}>
				<div className={cx('discussion-comments', 'large', {mask: mask})}>
					<Header
						post={post}

						current={currentPage}
						totalPages={totalPages}
						setPage={setPage}
					/>
					{context.isReplying(post) && (
						<CommentEditor
							inReplyTo={post}
							className={cx('post-reply-editor')}
							afterSave={() => context.stopReplying(post)}
							onCancel={() => context.stopReplying(post)}
						/>
					)}
					<Loading.Placeholder loading={loading} fallback={<Loading.Spinner />}>
						{error && (<Errors.Message className={cx('error')} error={t('error')} />)}
						{comments && (
							<div className={cx('comments-container')}>
								<ul className={cx('comment-list')}>
									{comments.map((comment) => {
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
							</div>
						)}
					</Loading.Placeholder>
				</div>
			</Router.RouteForProvider>
		</Context.Provider>
	);
}