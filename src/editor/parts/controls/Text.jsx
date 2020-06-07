import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Icons, Button} from '@nti/web-commons';
import {Editor} from '@nti/web-modeled-content';

import Styles from '../Styles.css';

const cx = classnames.bind(Styles);

DiscussionEditorTextControls.propTypes = {
	active: PropTypes.bool,
	setActive: PropTypes.func
};
export default function DiscussionEditorTextControls ({active, setActive}) {
	return (
		<div className={cx('control-group', {active})}>
			<Button className={cx('control-group-icon')} onClick={setActive}>
				<Icons.FontType />
			</Button>
			<div className={cx('control-group-items')}>
				<Editor.Buttons.Bold />
				<Editor.Buttons.Italic />
				<Editor.Buttons.Underline />
			</div>
		</div>
	);
}