import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {LinkTo} from '@nti/web-routing';
import {Text} from '@nti/web-commons';

import Styles from './Comments.css';
import Comment from './Comment';


const cx = classnames.bind(Styles);
const t = scoped('nti-discussions.item.common.post-card.Comments', {
	addComment: 'Add a comment...'
});

export default class PostCardComments extends React.Component {
	static propTypes = {
		post: PropTypes.shape({
			getID: PropTypes.func,
			commentCount: PropTypes.number,
			canAddComment: PropTypes.bool,
			getMostRecentComments: PropTypes.func
		}),
		item: PropTypes.object
	}

	state = {loading: true, comments: null}

	componentDidMount () {
		this.setup(this.props);
	}

	componentDidUpdate (prevProps) {
		const {post} = this.props;
		const {post:prevPost} = prevProps;

		if (post.getID() !== prevPost.getID()) {
			this.setState({loading: true, comments: null}, () => this.setup(this.props));
		}
	}

	async setup (props) {
		const {post} = props;

		try {
			const comments = await post.getMostRecentComments(2);

			this.setState({
				loading: false,
				comments
			});
		} catch (e) {
			this.setState({
				loading: false
			});
		}
	}

	render () {
		const {post, item} = this.props;

		return (
			<div className={cx('post-card-comments')}>
				{this.renderComments()}
				{post.canAddComment && (
					<LinkTo.Object object={item} context="comment" className={cx('add-comment')}>
						<Text.Base className={cx('add-comment-label')}>
							{t('addComment')}
						</Text.Base>
					</LinkTo.Object>
				)}
			</div>
		);
	}


	renderComments () {
		const {post} = this.props;
		const {commentCount} = post;
		const {comments, loading} = this.state;

		if (commentCount === 0) { return null; }

		const toRender = Array.from({length: commentCount})
			.map((_, i) => comments ? comments[i] : Comment.Placeholder)
			.filter(Boolean);

		return (
			<ul className={cx('comment-list', {loading})}>
				{toRender.map((comment, key) => {
					return (
						<li key={key}>
							<Comment comment={comment} />
						</li>
					);
				})}
			</ul>
		);
	}
}