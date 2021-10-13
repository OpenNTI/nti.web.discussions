import PropTypes from 'prop-types';

import PostCard from '../../common/post-card';

import { makePostInterface } from './utils';

TopicDiscussionCard.propTypes = {
	item: PropTypes.object,
};
export default function TopicDiscussionCard({ item, ...otherProps }) {
	return (
		<PostCard post={makePostInterface(item)} item={item} {...otherProps} />
	);
}
