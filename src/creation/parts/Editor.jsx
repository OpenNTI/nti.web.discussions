import React from 'react';
import classnames from 'classnames/bind';

import Editor from '../../editor';

import Styles from './Styles.css';

const cx = classnames.bind(Styles);

export default function DiscussionCreationEditor(props) {
	return <Editor {...props} className={cx('creation-editor')} />;
}
