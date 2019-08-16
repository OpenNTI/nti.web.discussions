import React from 'react';
import classnames from 'classnames/bind';

import Styles from './View.css';
import Content from './Content';
import Header from './Header';

const cx = classnames.bind(Styles);

export default function PostCard (props) {
	return (
		<div className={cx('post-card')}>
			<Header {...props} />
			<Content {...props} />
		</div>
	);
}