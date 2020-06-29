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

		editing,
		setEditing,
		replying,
		setReplying,

		focusedComment,
		focusComment
	} = useCommentTree(post);

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
	
	const getRouteFor = (obj, routeContext) => {
		if (!obj.isDiscussion && obj.getID() !== post.getID()) { return; }

		if (routeContext === 'edit') {
			return () => (setEditing(obj.getID()), setReplying(null));
		} else if (routeContext === 'reply') {
			if (obj === post) {
				return {
					replace: true,
					href: './#comment'
				};
			}

			return () => {
				setEditing(null);
				setReplying(obj.getID());
				context.expand(obj);
			};
		}
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
					<div className={cx('comments-container')}>
						{context.isReplying(post) && (
							<CommentEditor
								inReplyTo={post}
								className={cx('post-reply-editor')}
							/>
						)}
						<Loading.Placeholder loading={loading} fallback={<Loading.Spinner />}>
							{error && (<Errors.Message className={cx('error')} error={t('error')} />)}
							{comments && (
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
							)}
						</Loading.Placeholder>
					</div>
				</div>
			</Router.RouteForProvider>
		</Context.Provider>
	);
}