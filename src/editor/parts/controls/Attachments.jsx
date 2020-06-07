import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Icons, Button, Layouts} from '@nti/web-commons';
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
			<Button className={cx('control-group-icon')} onClick={setActive}>
				<Icons.PaperClip />
			</Button>
			<div className={cx('control-group-items')}>
				<Editor.Buttons.Image />
				<Editor.Buttons.Whiteboard />
				<Editor.Buttons.Video />
				<Editor.Buttons.File />
			</div>
		</Responsive.ClassList>
	);
}