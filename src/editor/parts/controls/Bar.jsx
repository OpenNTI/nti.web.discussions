import { useState } from 'react';
import classnames from 'classnames/bind';

import { Editor } from '@nti/web-modeled-content';

import Styles from '../Styles.css';

import Attachments from './Attachments';
import Cancel from './Cancel';
import Save from './Save';
import Text from './Text';

const cx = classnames.bind(Styles);

const text = 'text';
const attachments = 'attachments';

function DiscussionEditorControlBar(props) {
	const editor = Editor.ContextProvider.useEditorContext();
	const collapsedSelection = editor?.getSelection?.()?.isCollapsed?.();

	const [active, setActive] = useState(null);

	const toggleActive = newActive => {
		if (active === newActive) {
			setActive(null);
		} else {
			setActive(newActive);
		}
	};

	return (
		<div
			className={cx('control-bar', {
				'multiple-selection': !collapsedSelection,
			})}
		>
			<div className={cx('controls')}>
				<Text
					active={active === text}
					setActive={() => toggleActive(text)}
				/>
				<Attachments
					active={active === attachments}
					setActive={() => toggleActive(attachments)}
				/>
			</div>
			<div className={cx('actions')}>
				<Cancel {...props} />
				<Save {...props} />
			</div>
		</div>
	);
}

export default function DiscussionEditorControlBarWrapper(props) {
	return (
		<Editor.ContextProvider.EditorProvider>
			<DiscussionEditorControlBar {...props} />
		</Editor.ContextProvider.EditorProvider>
	);
}
