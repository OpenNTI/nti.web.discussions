import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {LinkTo} from '@nti/web-routing';
import {TextPreview} from '@nti/web-modeled-content';
import {User, Text} from '@nti/web-commons';

import {Controls} from '../../components';
import Action from '../Action';
import Report from '../Report';

import Styles from './View.css';

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
		body: PropTypes.any,
		commentCount: PropTypes.number
	})
};
export default function PostListItem (props) {
	const {item, post} = props;

	return (
		<LinkTo.Object object={item} className={cx('post-list-item')}>
			<Controls className={cx('controls')} item={item} />
			<User.Avatar className={cx('avatar')} user={post.creator} />
			<div className={cx('meta')}>
				<Action className={cx('list-item-action')} {...props} />
				{post.title && (<Text.Base className={cx('title')}>{post.title}</Text.Base>)}
				{!post.title && post.body && (<TextPreview body={post.body} className={cx('body-preview')} />)}
				<Text.Base className={cx('comments')}>{t('comments', {count: post.commentCount})}</Text.Base>
			</div>
			<div className={cx('list-report')}>
				<Report {...props} />
			</div>
		</LinkTo.Object>
	);
}