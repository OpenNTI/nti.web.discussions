import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Errors, Text} from '@nti/web-commons';
import {LinkTo} from '@nti/web-routing';

import {Controls} from '../../../../item';

import Styles from './Styles.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-web-discussions.stream.body.components.pinned-posts.View', {
	heading: {
		one: '%(count)s Pinned Post',
		other: '%(count)s Pinned Posts'
	}
});

PinnedPostsList.propTypes = {
	items: PropTypes.array,
	error: PropTypes.any
};
export default function PinnedPostsList ({items, error}) {
	if (!error && (!items || items.length === 0)) { return null; }

	return (
		<div className={cx('pinned-posts-list')}>
			{!error && (<Text.Base className={cx('header')}>{t('heading', {count: items?.length ?? 0})}</Text.Base>)}
			{error && (<Errors.Message error={error} className={cx('error')} />)}
			{items && items.length > 0 && (
				<ul className={cx('list')}>
					{items.map(item => {
						return (
							<li key={item.getID()}>
								<LinkTo.Object object={item} className={cx('pinned-item')}>
									<span className={cx('pinned-icon')} />
									<Text.Base className={cx('title')}>{item.title}</Text.Base>
									<div className={cx('controls')}>
										<Controls.ActionsFlyout item={item} />
									</div>
								</LinkTo.Object>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}