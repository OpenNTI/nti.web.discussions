import React from 'react';
import classnames from 'classnames/bind';

import Styles from '../Styles.css';

import Attachments from './Attachments';
import Cancel from './Cancel';
import Save from './Save';
import Text from './Text';

const cx = classnames.bind(Styles);

const text = 'text';
const attachments = 'attachments';

export default function DiscussionEditorControlBar (props) {
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
			<div className={cx('editor')}>
				<Text active={active === text} setActive={() => toggleActive(text)} />
				<Attachments active={active === attachments} setActive={() => toggleActive(attachments)} />
			</div>
			<div className={cx('post')}>
				<Cancel {...props} />
				<Save {...props} />
			</div>
		</div>
	);
}