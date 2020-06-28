import React from 'react';
import classnames from 'classnames/bind';

import Body from '../../body';
import Sharing from '../../sharing';
import Styles from '../Styles.css';

const cx = classnames.bind(Styles);

export default function DiscussionBody (props) {
	return (
		<div className={cx('body')}>
			<Sharing {...props} />
			<Body {...props} />
		</div>
	);
}