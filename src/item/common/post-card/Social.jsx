import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Like, Favorite} from '@nti/web-commons';

import Styles from './Social.css';

const cx = classnames.bind(Styles);

PostCardSocial.propTypes = {
	item: PropTypes.object,
	post: PropTypes.shape({
		commentCount: PropTypes.number
	})
};
export default function PostCardSocial ({item, post}) {
	const {commentCount} = post;

	return (
		<div className={cx('post-card-social')}>
			<div className={cx('post-like')}>
				<Like item={item} />
			</div>
			<div className={cx('post-favorite')}>
				<Favorite item={item} />
			</div>
			<div className={cx('spacer')} />
			<div className={cx('post-comments', {'has-comments': !!commentCount})}>
				<i className={cx('icon-discuss', 'add')} />
				<span className={cx('count')}>{commentCount || ''}</span>
			</div>
		</div>
	);
}