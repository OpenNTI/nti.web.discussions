import PropTypes from 'prop-types';

import PostListItem from '../../common/post-list-item';

import { makePostInterface } from './utils';

NoteDiscussionListItem.propTypes = {
	item: PropTypes.object,
};
export default function NoteDiscussionListItem({ item, ...otherProps }) {
	return (
		<PostListItem
			post={makePostInterface(item)}
			item={item}
			{...otherProps}
		/>
	);
}
