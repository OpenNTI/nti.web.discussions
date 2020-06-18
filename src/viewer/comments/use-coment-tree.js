import React from 'react';
import {encodeForURI, decodeFromURI} from '@nti/lib-ntiids';
import {getService} from '@nti/web-client';
import {Router} from '@nti/web-routing';

const BatchSize = 20;

function getFocused (router) {
	const hash = router?.route?.location?.hash;

	if (!hash || hash === '#edit') { return; }

	return decodeFromURI(hash.replace(/^#/, ''));
}

function getTopLevel (comment) {
	return comment?.references[0] ?? comment.getID();
}

function getExpandedToShowComment (comment) {
	return comment?.references[0];
}



export default function useCommentTree (post) {
	const router = Router.useRouter();

	const [page, setPage] = React.useState(0);
	const [totalPages, setTotalPages] = React.useState(1);

	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState(null);
	const [comments, setComments] = React.useState(null);

	const [expanded, setExpanded] = React.useState({});

	const focusedComment = getFocused(router);

	React.useEffect(() => {
		let unmounted = false;

		async function loadCommentTree () {
			const params = {
				batchSize: BatchSize,
				sortOn: 'CreatedTime',
				sortOrder: 'ascending'
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

				const focused = focusedComment ? await service.getObject(focusedComment) : null;

				if (focused) {
					params.batchContaining = getTopLevel(focused);
				} else {
					params.batchStart = page * BatchSize;
				}

				if (unmounted) { return; }

				const discussions = await post.getDiscussions(params);

				if (unmounted) { return; }

				if (focused) {
					setPage(discussions.BatchPage - 1);
						
					const toExpand = getExpandedToShowComment(focused);

					if (toExpand) {
						setExpanded({...expanded, [toExpand]: true});
					}
				}

				setTotalPages(discussions.TotalPageCount);
				setComments(discussions.Items);
				setLoading(false);
			} catch (e) {
				if (unmounted) { return; }

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

		error,
		comments,

		currentPage: page,
		totalPages: totalPages,
		setPage: (newPage) => {
			//clear focused comment
			setPage(newPage);
		},

		expanded,
		setExpanded,

		focusedComment,
		focusComment: (obj) => router.routeTo.path(`#${encodeForURI(obj.getID())}`)
	};
}