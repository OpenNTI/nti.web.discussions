import React from 'react';
import PropTypes from 'prop-types';

import { useChanges } from '@nti/web-core';

import { getCardCmpFor } from './types';

DiscussionItemCard.supportsItem = item => Boolean(getCardCmpFor(item));
DiscussionItemCard.propTypes = {
	item: PropTypes.object,
};
export default function DiscussionItemCard({ item, ...otherProps }) {
	const Cmp = getCardCmpFor(item);

	useChanges(item);

	if (!Cmp) {
		return null;
	}

	return <Cmp item={item} {...otherProps} />;
}
