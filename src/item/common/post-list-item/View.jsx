import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {LinkTo} from '@nti/web-routing';
import {User, Text, Like, Favorite} from '@nti/web-commons';

import Styles from './View.css';
import Creator from './Creator';

const cx = classnames.bind(Styles);
const t = scoped('nti-discussions.item.common.post-list-item.View', {
	comments: {
		one: '%(count)s Comment',
		other: '%(count)s Comments'
	}
});

PostListItem.propTypes = {
	item: PropTypes.object,
	post: PropTypes.shape({
		creator: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
		title: PropTypes.string,
		commentCount: PropTypes.number
	})
};
export default function PostListItem (props) {
	const {item, post} = props;

	return (
		<LinkTo.Object object={item} className={cx('post-list-item')}>
			<User.Avatar className={cx('avatar')} user={post.creator} />
			<div className={cx('meta')}>
				<Creator {...props} />
				<Text.Base className={cx('title')}>{post.title}</Text.Base>
				<Text.Base className={cx('comments')}>{t('comments', {count: post.commentCount})}</Text.Base>
			</div>
			<div className={cx('social')}>
				<Like item={item} />
				<Favorite item={item} />
			</div>
		</LinkTo.Object>
	);
}