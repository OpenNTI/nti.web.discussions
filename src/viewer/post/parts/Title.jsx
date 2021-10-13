import { useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { Text, ContentHighlighting } from '@nti/web-commons';
import { useForceUpdate } from '@nti/web-core';

import Styles from '../Styles.css';

const { SearchStrategy } = ContentHighlighting.Strategies;

const cx = classnames.bind(Styles);

PostTitle.propTypes = {
	className: PropTypes.string,
	as: PropTypes.any,
	post: PropTypes.shape({
		getID: PropTypes.func,
		getTitle: PropTypes.func,
		subscribeToPostChange: PropTypes.func,
	}),
	noHighlight: PropTypes.bool,
};
export default function PostTitle({ className, as: cmp, post, noHighlight }) {
	const highlightStrat = SearchStrategy.useStrategy(
		noHighlight ? null : post.getID()
	);

	const forceUpdate = useForceUpdate();

	useEffect(() => post.subscribeToPostChange(forceUpdate), [post]);

	return (
		<ContentHighlighting
			strategy={highlightStrat}
			className={cx('title', className)}
		>
			<Text.Base as={cmp || 'h1'}>{post.getTitle()}</Text.Base>
		</ContentHighlighting>
	);
}
