import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Hooks, ContentHighlighting} from '@nti/web-commons';
import {Viewer} from '@nti/web-modeled-content';

import Styles from './Styles.css';
import {getLegacyBody} from './utils';
import {renderAnchor} from './parts';
import Context from './Context';

const {SearchStrategy} = ContentHighlighting.Strategies;

const cx = classnames.bind(Styles);


DiscussionBody.getLegacyBody = getLegacyBody;
DiscussionBody.propTypes = {
	className: PropTypes.string,
	post: PropTypes.shape({
		getID: PropTypes.func,
		getBody: PropTypes.func,
		getPostHash: PropTypes.func,
		subscribeToPostChange: PropTypes.func
	}),

	noHighlight: PropTypes.bool,
	highlightContainer: PropTypes.any
};
export default function DiscussionBody ({className, post, noHighlight, highlightContainer, ...otherProps}) {
	const highlightStrat = SearchStrategy.useStrategy(
		noHighlight ? null : (highlightContainer ?? post.getID())
	);

	const forceUpdate = Hooks.useForceUpdate();
	const body = React.useMemo(() => getLegacyBody(post), [post.getPostHash()]);

	React.useEffect(() => post.subscribeToPostChange(forceUpdate), [post]);

	if (!body) {
		return null;
	}

	return (
		<Context.Provider value={{post}}>
			<ContentHighlighting strategy={highlightStrat} className={cx('body', className)}>
				<Viewer
					content={body}
					renderAnchor={renderAnchor}
					{...otherProps}
				/>
			</ContentHighlighting>
		</Context.Provider>
	);
}
