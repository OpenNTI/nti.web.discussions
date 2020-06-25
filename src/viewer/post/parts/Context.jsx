import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import Styles from '../Styles.css';
import Context from '../../../context';

const cx = classnames.bind(Styles);

let ContextOverride = null;

DiscussionPostContext.setContextOverride = (override) => ContextOverride = override;
DiscussionPostContext.propTypes = {
	post: PropTypes.shape({
		getContextData: PropTypes.func
	})
};
export default function DiscussionPostContext ({post}) {
	const empty = !post.getContextData;
	const Cmp = ContextOverride ?? Context;

	return (
		<div className={cx('context', {empty})}>
			{!empty && (
				<Cmp item={post} />
			)}
		</div>
	);
}