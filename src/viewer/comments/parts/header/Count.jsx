import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Text} from '@nti/web-commons';

import Styles from '../../Styles.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-discussions.viewer.comments.parts.header.Count', {
	comments: {
		one: '%(count)s Comment',
		other: '%(count)s Comments'
	}
});

DiscussionCommentCount.propTypes = {
	post: PropTypes.shape({
		getDiscussionCount: PropTypes.func
	})
};
export default function DiscussionCommentCount ({post}) {
	if (!post) {
		return null;
	}

	return (
		<Text.Base className={cx('comment-count')}>
			{t('comments', {count: post.getDiscussionCount()})}
		</Text.Base>
	);
}