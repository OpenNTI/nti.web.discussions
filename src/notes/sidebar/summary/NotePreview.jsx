import React from 'react';
import PropTypes from 'prop-types';
import {Panel} from '@nti/web-modeled-content';
import classnames from 'classnames/bind';

import styles from './NotePreview.css';

const cx = classnames.bind(styles);

export default function NotePreview ({note, ...props}) {
	if (!note) { return null;}

	const contents = note.title ? [note.title] : note.body;

	return (
		<Panel className={cx('note-preview')} body={contents} previewMode previewLength={80} />
	);
}

NotePreview.propTypes = {
	note: PropTypes.shape({
		title: PropTypes.string,
		body: PropTypes.array
	}).isRequired
};
