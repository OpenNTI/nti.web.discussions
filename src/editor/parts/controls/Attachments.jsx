import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Icons, Layouts} from '@nti/web-commons';
import {Editor} from '@nti/web-modeled-content';

import Styles from '../Styles.css';

const cx = classnames.bind(Styles);
const {Responsive} = Layouts;

const classList = [
	{query: (size) => size.width >= 150, className: cx('expanded')}
];

DiscussionEditorAttachmentControls.propTypes = {
	active: PropTypes.bool,
	setActive: PropTypes.func
};
export default function DiscussionEditorAttachmentControls ({active, setActive}) {
	return (
		<Responsive.ClassList classList={classList} className={cx('control-group', 'main', {active})}>
			<Editor.Buttons.Button className={cx('control-group-icon', 'button')} onClick={setActive}>
				<Icons.PaperClip />
			</Editor.Buttons.Button>
			<div className={cx('control-group-items')}>
				<Editor.Buttons.Image className={cx('button')} />
				<Editor.Buttons.Whiteboard className={cx('button')} />
				<Editor.Buttons.Video className={cx('button')} />
				<Editor.Buttons.File className={cx('button')} />
			</div>
		</Responsive.ClassList>
	);
}