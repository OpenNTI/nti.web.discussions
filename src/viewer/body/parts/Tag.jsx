import React from 'react';
import classnames from 'classnames/bind';

import Styles from './Tag.css';

const cx = classnames.bind(Styles);

Tag.handles = attributes => attributes['data-nti-entity-type'] === 'TAG';
export default function Tag(props) {
	return <span className={cx('tag')} {...props} />;
}
