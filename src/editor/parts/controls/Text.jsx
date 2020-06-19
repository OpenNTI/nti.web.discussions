import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Editor} from '@nti/web-modeled-content';

import Styles from '../Styles.css';

const cx = classnames.bind(Styles);

DiscussionEditorTextControls.propTypes = {
	active: PropTypes.bool,
	setActive: PropTypes.func
};
export default function DiscussionEditorTextControls ({active, setActive}) {
	return (
		<div className={cx('control-group', 'text')}>
			<Editor.Buttons.Bold className={cx('button', 'grey')} activeClassName={cx('active')} />
			<Editor.Buttons.Italic className={cx('button', 'grey')} activeClassName={cx('active')} />
			<Editor.Buttons.Underline className={cx('button', 'grey')} activeClassName={cx('active')} />
		</div>
	);
}