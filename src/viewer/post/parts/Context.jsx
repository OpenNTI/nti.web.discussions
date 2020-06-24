import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import Styles from '../Styles.css';
import Context from '../../../context';

const cx = classnames.bind(Styles);

DiscussionPostContext.propTypes = {
	post: PropTypes.shape({
		getContextData: PropTypes.func
	})
};
export default function DiscussionPostContext ({post}) {
	const empty = !post.getContextData;

	return (
		<div className={cx('context', {empty})}>
			{!empty && (
				<Context item={post} />
			)}
		</div>
	);
}