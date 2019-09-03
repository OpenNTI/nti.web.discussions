import React from 'react';
import PropTypes from 'prop-types';

import PostCard from '../../common/post-card';

import {makePostInterface} from './utils';

BlogEntry.propTypes = {
	item: PropTypes.object
};
export default function BlogEntry ({item, ...otherProps}) {
	return (
		<PostCard post={makePostInterface(item)} item={item} {...otherProps} />
	);
}