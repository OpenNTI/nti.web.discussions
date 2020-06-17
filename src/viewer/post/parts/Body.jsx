import React from 'react';
import classnames from 'classnames/bind';

import Body from '../../body';
import Styles from '../Styles.css';

const cx = classnames.bind(Styles);

export default function DiscussionBody (props) {
	return (
		<Body
			className={cx('body')}
			{...props}
		/>
	);
}