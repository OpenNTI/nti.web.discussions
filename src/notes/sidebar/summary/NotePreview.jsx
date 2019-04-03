import React from 'react';
import PropTypes from 'prop-types';
import {Panel} from '@nti/web-modeled-content';
import classnames from 'classnames/bind';

import styles from './NotePreview.css';

const cx = classnames.bind(styles);

export default function NotePreview ({note, ...props}) {
	return !note ? null : (
		<Panel className={cx('note-preview')} body={note.body} previewMode previewLength={80} />
	);
}

NotePreview.propTypes = {
	note: PropTypes.shape({
		title: PropTypes.string,
		body: PropTypes.array
	}).isRequired
};
