import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Hooks} from '@nti/web-commons';
import {Viewer} from '@nti/web-modeled-content';

import Styles from './Styles.css';
import {getLegacyBody} from './utils';
import {renderAnchor} from './parts';
import Context from './Context';

const cx = classnames.bind(Styles);


DiscussionBody.getLegacyBody = getLegacyBody;
DiscussionBody.propTypes = {
	className: PropTypes.string,
	post: PropTypes.shape({
		getBody: PropTypes.func,
		getPostHash: PropTypes.func,
		subscribeToPostChange: PropTypes.func
	})
};
export default function DiscussionBody ({className, post, ...otherProps}) {
	const forceUpdate = Hooks.useForceUpdate();
	const body = React.useMemo(() => getLegacyBody(post), [post.getPostHash()]);

	React.useEffect(() => post.subscribeToPostChange(forceUpdate), [post]);

	if (!body) {
		return null;
	}

	return (
		<Context.Provider value={{post}}>
			<Viewer
				className={cx('body', className)}
				content={body}
				renderAnchor={renderAnchor}
				{...otherProps}
			/>
		</Context.Provider>
	);
}