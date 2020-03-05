import React from 'react';
import {PropTypes} from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';

import Styles from './EmptyState.css';

const cx = classnames.bind(Styles);
const t = scoped('discussions.notes.sidebar.EmptyState', {
	message: 'Be the first to start a discussion.'
});

NoteSidebarEmptyState.propTypes = {
	onNewNote: PropTypes.func
};
export default function NoteSidebarEmptyState ({onNewNote}) {
	return (
		<div className={cx('note-sidebar-empty-state', {clickable: Boolean(onNewNote)})} onClick={onNewNote} >
			<div className={cx('icon')} />
			<div className={cx('message')}>
				{t('message')}
			</div>
		</div>
	);
}
