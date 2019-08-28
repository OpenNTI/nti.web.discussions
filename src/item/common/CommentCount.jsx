import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Text} from '@nti/web-commons';

import Styles from './CommentCount.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-discussion.item.common.CommentCount', {
	comments: {
		one: '%(count)s Comment',
		other: '%(count)s Comments'
	}
});

export default class DiscussionItemCommentCount extends React.Component {
	static propTypes = {
		className: PropTypes.string,
		post: PropTypes.shape({
			getID: PropTypes.string,
			commentCount: PropTypes.number,
			addCommentAddedListener: PropTypes.func,
			addCommentDeletedListener: PropTypes.func
		})
	}

	state = {delta: 0}

	componentDidMount () {
		this.setup();
	}

	componentWillUnmount () {
		this.cleanupListeners();
	}

	componentDidUpdate (prevProps) {
		const {post} = this.props;
		const {post:prevPost} = prevProps;

		if (post.getID() !== prevPost.getID()) {
			this.setup();
		}
	}


	addListeners () {
		this.cleanupListeners();

		const {post} = this.props;

		if (post.addCommentAddedListener) {
			this.cleanupCommentAddedListener = post.addCommentAddedListener((newComment) => {
				const {delta} = this.state;

				this.setState({
					delta: delta + 1
				});
			});
		}

		if (post.addCommentDeletedListener) {
			this.cleanupCommentDeletedListener = post.addCommentDeletedListener((deletedComment) => {
				const {delta} = this.state;

				this.setState({
					delta: delta - 1
				});
			});
		}
	}


	cleanupListeners () {
		if (this.cleanupCommentAddedListener) {
			this.cleanupCommentAddedListener();
			delete this.cleanupCommentAddedListener;
		}

		if (this.cleanupCommentDeletedListener) {
			this.cleanupCommentDeletedListener();
			delete this.cleanupCommentDeletedListener;
		}
	}


	setup () {
		this.addListeners();
	}

	render () {
		const {className, post} = this.props;
		const {delta} = this.state;

		const count = (post.commentCount || 0) + (delta || 0);

		return (
			<Text.Base className={cx('discussion-item-comment-count', className)}>
				{t('comments', {count})}
			</Text.Base>
		);
	}
}
