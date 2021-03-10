import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { Editor } from '@nti/web-modeled-content';

import Styles from '../Styles.css';

const cx = classnames.bind(Styles);

DiscussionEditorAttachmentControls.propTypes = {
	active: PropTypes.bool,
	setActive: PropTypes.func,
};
export default function DiscussionEditorAttachmentControls({
	active,
	setActive,
}) {
	return (
		<div className={cx('control-group', 'attachments')}>
			<Editor.Buttons.Image className={cx('button', 'blue')} />
			<Editor.Buttons.Video className={cx('button', 'red')} />
			<Editor.Buttons.File className={cx('button', 'purple')} />
			<Editor.Buttons.Whiteboard className={cx('button', 'pink')} />
		</div>
	);
}
