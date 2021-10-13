import PropTypes from 'prop-types';

FallbackDiscussionItem.propTypes = {
	item: PropTypes.shape({
		MimeType: PropTypes.string,
	}),
};
export default function FallbackDiscussionItem({ item }) {
	return <span>{`Unknown Discussion Item: ${item && item.MimeType}`}</span>;
}
