import { useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { scoped } from '@nti/lib-locale';
import { Text } from '@nti/web-commons';
import { useForceUpdate } from '@nti/web-core';

import Styles from '../../Styles.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-discussions.viewer.comments.parts.header.Count', {
	comments: {
		one: '%(count)s Comment',
		other: '%(count)s Comments',
	},
});

DiscussionCommentCount.propTypes = {
	post: PropTypes.shape({
		getDiscussionCount: PropTypes.func,
		subscribeToChange: PropTypes.func,
	}),
};
export default function DiscussionCommentCount({ post }) {
	const forceUpdate = useForceUpdate();

	useEffect(() => post.subscribeToChange(forceUpdate), [post]);

	if (!post) {
		return null;
	}

	return (
		<Text.Base className={cx('comment-count')}>
			{t('comments', { count: post.getDiscussionCount() })}
		</Text.Base>
	);
}
