import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { User, DateTime, List } from '@nti/web-commons';
import { LinkTo } from '@nti/web-routing';

import Styles from '../Styles.css';

const cx = classnames.bind(Styles);

DiscussionInfo.propTypes = {
	post: PropTypes.shape({
		creator: PropTypes.any,
		getCreatedTime: PropTypes.func,
	}),
};
export default function DiscussionInfo({ post }) {
	const user = User.useUser(post.creator);

	if (!user) {
		return null;
	}

	return (
		<List.SeparatedInline className={cx('info')}>
			<LinkTo.Object object={user} className={cx('display-name')}>
				<User.DisplayName user={user} />
			</LinkTo.Object>
			<DateTime
				className={cx('created')}
				date={post.getCreatedTime()}
				relative
			/>
		</List.SeparatedInline>
	);
}
