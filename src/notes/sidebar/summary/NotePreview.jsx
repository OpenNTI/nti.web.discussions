import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';

import Viewer from '../../../viewer';

import styles from './NotePreview.css';

const cx = classnames.bind(styles);

const t = scoped('discussions.notes.sidebar.summary.NotePreview', {
	placeholder: '[Deleted]'
});

export default function NotePreview ({note, ...props}) {
	if (!note) { return null;}

	const post = note.title ?
		({
			getBody: () => [note.title],
			getMentions: () => [],
			getTags: () => [],
			getPostHash: () => note.title,
			subscribeToPostChange: (...args) => note.subscribeToPostChange(...args)
		}) :
		note;

	return (
		<div className={cx('note-preview')}>
			{note.placeholder && (
				<div className={cx('placeholder-content')}>{t('placeholder')}</div>
			)}
			{!note.placeholder && (
				<Viewer.Body
					className={cx('content')}
					post={post}
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
		body: PropTypes.array,
		subscribeToPostChange: PropTypes.func
	}).isRequired
};
