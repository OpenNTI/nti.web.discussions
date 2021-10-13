import { useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { scoped } from '@nti/lib-locale';
import { Text } from '@nti/web-commons';
import { useForceUpdate } from '@nti/web-core';

import Styles from './CommentCount.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-discussion.item.common.CommentCount', {
	comments: {
		one: '%(count)s Comment',
		other: '%(count)s Comments',
	},
});

DiscussionItemCommentCount.propTypes = {
	item: PropTypes.shape({
		subscribeToChange: PropTypes.func,
		getDiscussionCount: PropTypes.func,
	}),
};
export default function DiscussionItemCommentCount({ className, item }) {
	const forceUpdate = useForceUpdate();
	const count = item.getDiscussionCount();

	useEffect(
		() =>
			item.subscribeToChange(() => {
				forceUpdate();
			}),
		[item]
	);

	return (
		<Text.Base className={cx('discussion-item-comment-count', className)}>
			{t('comments', { count })}
		</Text.Base>
	);
}
