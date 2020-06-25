import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {StandardUI} from '@nti/web-commons';

import Styles from './Styles.css';

const cx = classnames.bind(Styles);

DiscussionCreationContainer.propTypes = {
	className: PropTypes.string,
	dialog: PropTypes.bool,
	small: PropTypes.bool
};
export default function DiscussionCreationContainer ({className, dialog, small, ...otherProps}) {
	const Cmp = dialog ? StandardUI.Card : 'div';

	return (
		<Cmp
			className={cx('discussion-creation-container', {dialog, small})}
			{...otherProps}
			{...(dialog ? ({rounded: true}) : ({}))}
		/>
	);
}