import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import Styles from './Viewer.css';
import Post from './post';
import Comments from './comments';

const cx = classnames.bind(Styles);

DiscussionViewer.propTypes = {
	className: PropTypes.string,
	discussion: PropTypes.object,
	container: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.array
	]),

	dialog: PropTypes.bool
};
export default function DiscussionViewer ({className, discussion, container, dialog}) {
	return (
		<article className={cx('discussion-viewer', className, {dialog})}>
			<Post post={discussion} container={container} />
			<Comments post={discussion} container={container} />
		</article>
	);
}