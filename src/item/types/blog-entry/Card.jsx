import PropTypes from 'prop-types';

import PostCard from '../../common/post-card';

import { makePostInterface } from './utils';

BlogEntryDiscussionCard.propTypes = {
	item: PropTypes.object,
};
export default function BlogEntryDiscussionCard({ item, ...otherProps }) {
	return (
		<PostCard post={makePostInterface(item)} item={item} {...otherProps} />
	);
}
