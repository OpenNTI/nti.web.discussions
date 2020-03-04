import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {LinkTo} from '@nti/web-routing';
import {TextPreview} from '@nti/web-modeled-content';
import {User, Text, List} from '@nti/web-commons';

import {Controls, PinnedLabel} from '../../components';
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
		commentCount: PropTypes.number,
		isPinned: PropTypes.bool
	})
};
export default function PostListItem (props) {
	const {item, post} = props;

	return (
		<LinkTo.Object object={item} className={cx('post-list-item')}>
			<Controls className={cx('controls')} item={item} />
			<div className={cx('content')}>
				<User.Avatar className={cx('avatar')} user={post.creator} />
				<div className={cx('meta')}>
					<Action className={cx('list-item-action')} {...props} />
					{post.title && (<Text.Base className={cx('title')}>{post.title}</Text.Base>)}
					{!post.title && post.body && (<TextPreview body={post.body} className={cx('body-preview')} />)}
					<List.SeparatedInline className={cx('list-items')}>
						<Text.Base className={cx('comments')}>{t('comments', {count: post.commentCount})}</Text.Base>
						{post.isPinned && (<PinnedLabel />)}
					</List.SeparatedInline>
				</div>
				<div className={cx('list-report')}>
					<Report {...props} />
				</div>
			</div>
		</LinkTo.Object>
	);
}