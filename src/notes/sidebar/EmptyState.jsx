import React from 'react';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';

import Styles from './EmptyState.css';

const cx = classnames.bind(Styles);
const t = scoped('discussions.notes.sidebar.EmptyState', {
	message: 'Be the first to start a discussion.'
});

export default function NoteSidebarEmptyState () {
	return (
		<div className={cx('note-sidebar-empty-state')}>
			<div className={cx('icon')} />
			<div className={cx('message')}>
				{t('message')}
			</div>
		</div>
	);
}
