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

DiscussionItemCommentCount.propTypes = {
	className: PropTypes.string,
	post: PropTypes.shape({
		commentCount: PropTypes.number
	})
};
export default function DiscussionItemCommentCount ({className, post}) {
	return (
		<Text.Base className={cx('discussion-item-comment-count', className)}>
			{t('comments', {count: post.commentCount || 0})}
		</Text.Base>
	);
}