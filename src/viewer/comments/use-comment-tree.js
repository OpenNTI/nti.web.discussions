import React from 'react';

import { encodeForURI, decodeFromURI } from '@nti/lib-ntiids';
import { getService } from '@nti/web-client';
import { Router, getHistory, useLocation } from '@nti/web-routing';

const BatchSize = 20;

function getFocused(hash) {
	if (!hash || hash === '#edit' || hash === '#comment') {
		return;
	}

	const [possibleNtiid, action] = hash.replace(/^#/, '').split('#');
	if (action === 'edit') {
		return;
	}

	return decodeFromURI(possibleNtiid);
}

function getTopLevel(comment) {
	return comment?.references[0] ?? comment.getID();
}

function getExpandedToShowComment(comment) {
	return comment?.references[0];
}

export default function useCommentTree(post) {
	const router = Router.useRouter();
	const location = useLocation();

	const [page, setPage] = React.useState(0);
	const [totalPages, setTotalPages] = React.useState(1);

	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState(null);
	const [comments, setComments] = React.useState(null);

	const [expanded, setExpanded] = React.useState({});

	const [editing, setEditing] = React.useState(null);
	const [replying, setReplying] = React.useState(null);

	const { hash } = location;
	const focusedComment = getFocused(hash, post);
	const clearFocused = () => {
		if (hash) {
			router.routeTo.path({ replace: true, href: '.' });
		}
	};

	React.useEffect(() => {
		if (hash === '#comment') {
			if (replying !== post.getID()) {
				setReplying(post.getID());
			}
		}
	}, [hash]);

	React.useEffect(() => {
		let unmounted = false;

		async function loadCommentTree() {
			const params = {
				batchSize: BatchSize,
				sortOn: 'CreatedTime',
				sortOrder: 'ascending',
			};

			if (focusedComment) {
				params.batchContaining = focusedComment;
			} else {
				params.batchStart = page * BatchSize;
			}

			setLoading(true);
			setError(null);

			try {
				const service = await getService();
				const focused = focusedComment
					? await service.getObject(focusedComment)
					: null;

				if (unmounted) {
					return;
				}

				const focusedTopLevel = focused && getTopLevel(focused);

				if (
					focusedTopLevel &&
					comments?.some(
						comment => comment.getID() === focusedTopLevel
					)
				) {
					const toExpand = getExpandedToShowComment(focused);

					if (toExpand) {
						setExpanded({ ...expanded, [toExpand]: true });
					}

					return;
				}

				if (focused) {
					params.batchContaining = getTopLevel(focused);
				} else {
					params.batchStart = page * BatchSize;
				}

				const discussions = await post.getDiscussions(params);

				if (unmounted) {
					return;
				}

				if (focused) {
					setPage(discussions.BatchPage - 1);

					const toExpand = getExpandedToShowComment(focused);

					if (toExpand) {
						setExpanded({ ...expanded, [toExpand]: true });
					}
				}

				setTotalPages(discussions.TotalPageCount);
				setComments(discussions.Items);
				setLoading(false);
			} catch (e) {
				if (unmounted) {
					return;
				}
				// eslint-disable-next-line no-console
				console.log(e.stack || e.message || e);
				setError(e);
				setLoading(false);
			}
		}

		loadCommentTree();

		return () => {
			unmounted = true;
		};
	}, [post, focusedComment || page]);

	return {
		loading: !comments && loading,
		mask: comments && loading,

		clearFocused,

		error,
		comments,

		currentPage: page,
		totalPages: totalPages,
		setPage: newPage => {
			clearFocused();
			setPage(newPage);
		},

		expanded,
		setExpanded: e => setExpanded(e),

		editing,
		replying,

		setEditorState: async ({
			editing: newEditing,
			replying: newReplying,
		}) => {
			try {
				clearFocused();
				await getHistory().awaitUserConfirmation();
				setEditing(newEditing);
				setReplying(newReplying);
			} catch (err) {
				//swallow
			}
		},

		focusedComment,
		focusComment: obj =>
			router.routeTo.path({
				replace: true,
				href: `#${encodeForURI(obj.getID())}`,
			}),
	};
}
