import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Layouts} from '@nti/web-commons';

import Styles from './Styles.css';

const cx = classnames.bind(Styles);
const {Responsive} = Layouts;

const classList = [
	{query: size => size.width >= 675, className: cx('large')},
	{query: size => size.width < 675, className: cx('small')}
];

DiscussionEditorContainer.propTypes = {
	className: PropTypes.string
};
export default function DiscussionEditorContainer ({className, ...otherProps}) {
	return (
		<Responsive.ClassList
			{...otherProps}
			className={cx('discussion-editor-container', className)}
			classList={classList}
		/>
	);
}