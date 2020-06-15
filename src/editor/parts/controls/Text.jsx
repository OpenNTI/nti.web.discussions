import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Icons} from '@nti/web-commons';
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
			<Editor.Buttons.Button className={cx('control-group-icon', 'button', 'green')} onClick={setActive}>
				<Icons.FontType />
			</Editor.Buttons.Button>
			<div className={cx('control-group-items')}>
				<Editor.Buttons.Bold className={cx('button')} />
				<Editor.Buttons.Italic className={cx('button')} />
				<Editor.Buttons.Underline className={cx('button')} />
			</div>
		</div>
	);
}