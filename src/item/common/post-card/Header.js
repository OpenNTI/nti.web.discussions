import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {User, DateTime} from '@nti/web-commons';

import Styles from './Header.css';

const cx = classnames.bind(Styles);

const DateFormat = 'MMMM D [at] h:mm a';

PostCardHeader.propTypes = {
	post: PropTypes.shape({
		creator: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
		CreatedTime: PropTypes.object
	})
};
export default function PostCardHeader ({post}) {
	return (
		<div className={cx('post-card-header')}>
			<User.Avatar className={cx('avatar')} user={post.creator} />
			<div className={cx('meta')}>
				<User.DisplayName className={cx('user-name')} user={post.creator} />
				<DateTime className={cx('date')} date={post.CreatedTime} format={DateFormat} />
			</div>
		</div>
	);
}

