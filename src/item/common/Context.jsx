import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Text} from '@nti/web-commons';

import Styles from './Context.css';

const cx = classnames.bind(Styles);

DiscussionItemContext.propTypes = {
	className: PropTypes.string,
	post: PropTypes.shape({
		contextId: PropTypes.string,
		contextTitle: PropTypes.string
	}),
	context: PropTypes.shape({
		getID: PropTypes.func
	})
};
export default function DiscussionItemContext ({className, post, context}) {
	if (!context || !post || !context.getID() || post.contextId === context.getID() || !post.contextTitle) { return null; }

	return (
		<Text.Base className={cx('discussion-item-context', className)}>
			{post.contextTitle}
		</Text.Base>
	);
}