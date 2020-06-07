import React from 'react';
import classnames from 'classnames/bind';

import Styles from '../Styles.css';

import Text from './Text';
import Attachments from './Attachments';

const cx = classnames.bind(Styles);

const text = 'text';
const attachments = 'attachments';

export default function DiscussionEditorControlBar () {
	const [active, setActive] = React.useState(null);

	const toggleActive = (newActive) => {
		if (active === newActive) {
			setActive(null);
		} else {
			setActive(newActive);
		}
	};

	return (
		<div className={cx('controls')}>
			<Text active={active === text} setActive={() => toggleActive(text)} />
			<Attachments active={active === attachments} setActive={() => toggleActive(attachments)} />
		</div>
	);
}