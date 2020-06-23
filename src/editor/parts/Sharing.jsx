import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import {Display, Editor} from '../../sharing';

import Styles from './Styles.css';
import Context from './Context';

const cx = classnames.bind(Styles);

Sharing.propTypes = {
	post: PropTypes.shape({
		sharing: PropTypes.any,
		setSharing: PropTypes.func
	}),
	container: PropTypes.any
};
export default function Sharing ({post, container}) {
	const context = React.useContext(Context);

	const showEditorOverlay = () => {
		context?.setOverlay({
			Cmp: Editor,
			props: {
				className: cx('sharing-editor'),
				discussion: post,
				container: container,
				onSave: () => context?.setOverlay(null),
				onCancel: () => context?.setOverlay(null)
			}
		});
	};

	return (
		<div className={cx('sharing')}>
			<Display.Inline discussion={post} container={container} trigger onClick={showEditorOverlay} />
		</div>
	);
}