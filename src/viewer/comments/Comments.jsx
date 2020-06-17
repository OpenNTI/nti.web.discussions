import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Loading, Errors, Hooks} from '@nti/web-commons';

import Styles from './Styles.css';
import Header from './parts/header';
import Comment from './parts/comment';

const cx = classnames.bind(Styles);
const t = scoped('nti-discussions.viewer.comments.Comments', {
	error: 'Unable to load Comments'
});

const BatchSize = 20;

const {useResolver} = Hooks;
const {isPending, isErrored, isResolved} = useResolver; 


DiscussionComments.propTypes = {
	post: PropTypes.shape({
		getComments: PropTypes.func
	})
};
export default function DiscussionComments ({post}) {
	const [page, setPage] = React.useState(0);
	const [expanded, setExpanded] = React.useState({});

	const commentsResolver = useResolver(async () => {
		return post.getComments({batchSize: BatchSize, batchStart: page * BatchSize, sortOn: 'CreatedTime', sortOrder: 'ascending'});
	}, [post, page]);

	const loading = isPending(commentsResolver);
	const error = isErrored(commentsResolver) ? commentsResolver : null;
	const comments = isResolved(commentsResolver) ? commentsResolver : null;

	return (
		<div className={cx('discussion-comments', 'large')}>
			<Loading.Placeholder loading={loading} fallback={<Loading.Spinner />}>
				{error && (<Errors.Message className={cx('error')} error={t('error')} />)}
				{comments && (
					<div className={cx('comments-container')}>
						<Header
							post={post}
							comments={comments}

							page={page}
							setPage={setPage}
							totalPages={comments.TotalPageCount}

							setExpanded={setExpanded}
						/>
						<ul className={cx('comment-list')}>
							{comments.Items.map((comment) => {
								const id = comment.getID();

								return (
									<li key={id}>
										<Comment
											comment={comment}
											expanded={expanded[id]}
											expand={() => setExpanded({...expanded, [id]: true})}
											collapse={() => {
												debugger;
												const clone = {...expanded};
												delete clone[id];

												setExpanded(clone);
											}}
										/>
									</li>
								);
							})}
						</ul>
					</div>
				)}
			</Loading.Placeholder>
		</div>
	);
}