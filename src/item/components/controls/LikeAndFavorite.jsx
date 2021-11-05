import PropTypes from 'prop-types';
import cx from 'classnames';

import { Like, Favorite } from '@nti/web-commons';

// TODO: this should be moved into LuckyCharms and kept as a shared implementation of this cluster.
const Charms = styled.div`
	:global {
		.favorite,
		.like:not(.count) {
			&:not(.active):not(:focus) {
				visibility: var(--inactive-charm-visibility, visible);
			}
		}
	}
`;

DiscussionItemControlsLikeAndFavorite.propTypes = {
	className: PropTypes.string,
	item: PropTypes.shape({
		isTopLevel: PropTypes.func,
		placeholder: PropTypes.bool,
	}).isRequired,
};
export default function DiscussionItemControlsLikeAndFavorite({
	className,
	item,
}) {
	if (!item || !item.isTopLevel || item.placeholder) {
		return null;
	}

	return (
		<Charms className={cx('like-and-favorite', className)}>
			<Like
				item={item}
				css={css`
					[data-button-label] {
						margin: 0 2px;
						color: var(--primary-blue);
						text-decoration: none;
					}
				`}
			/>
			{item.isTopLevel() && <Favorite item={item} />}
		</Charms>
	);
}
