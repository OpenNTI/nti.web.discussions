import React from 'react';
import PropTypes from 'prop-types';

import { Hooks } from '@nti/web-commons';

import { getCardCmpFor } from './types';

DiscussionItemCard.supportsItem = item => Boolean(getCardCmpFor(item));
DiscussionItemCard.propTypes = {
	item: PropTypes.object,
};
export default function DiscussionItemCard({ item, ...otherProps }) {
	const Cmp = getCardCmpFor(item);

	Hooks.useChanges(item);

	if (!Cmp) {
		return null;
	}

	return <Cmp item={item} {...otherProps} />;
}
