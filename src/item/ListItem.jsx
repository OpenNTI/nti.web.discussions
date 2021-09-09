import React from 'react';
import PropTypes from 'prop-types';

import { useChanges } from '@nti/web-core';

import { getListItemCmpFor } from './types';

DiscussionItemListItem.supportsItem = item => Boolean(getListItemCmpFor(item));
DiscussionItemListItem.propTypes = {
	item: PropTypes.object,
};
export default function DiscussionItemListItem({ item, ...otherProps }) {
	const Cmp = getListItemCmpFor(item);

	useChanges(item);

	if (!Cmp) {
		return null;
	}

	return <Cmp item={item} {...otherProps} />;
}
