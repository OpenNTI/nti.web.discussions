import React from 'react';
import PropTypes from 'prop-types';

import PostListItem from '../../common/post-list-item';

import { makePostInterface } from './utils';

TopicDicussionListItem.propTypes = {
	item: PropTypes.object,
};
export default function TopicDicussionListItem({ item, ...otherProps }) {
	return (
		<PostListItem
			post={makePostInterface(item)}
			item={item}
			{...otherProps}
		/>
	);
}
