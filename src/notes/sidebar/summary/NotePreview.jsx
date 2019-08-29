import React from 'react';
import PropTypes from 'prop-types';
import {Panel} from '@nti/web-modeled-content';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';

import styles from './NotePreview.css';

const cx = classnames.bind(styles);

const t = scoped('discussions.notes.sidebar.summary.NotePreview', {
	placeholder: '[Deleted]'
});

export default function NotePreview ({note, ...props}) {
	if (!note) { return null;}
	return (
		<div className={cx('note-preview')}>
			{note.placeholder && (
				<div className={cx('placeholder-content')}>{t('placeholder')}</div>
			)}
			{!note.placeholder && (
				<Panel
					className={cx('content')}
					body={note.title ? [note.title] : note.body}
					previewMode
					previewLength={80}
				/>
			)}
		</div>
	);
}

NotePreview.propTypes = {
	note: PropTypes.shape({
		title: PropTypes.string,
		placeholder: PropTypes.string,
		body: PropTypes.array
	}).isRequired
};
