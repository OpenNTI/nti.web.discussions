import React from 'react';

import Mention from './Mention';
import Tag from './Tag';

const Anchors = [
	Mention,
	Tag
];

export function renderAnchor (tag, attributes, children) {
	const Cmp = Anchors.find(a => a.handles(attributes)) || 'a';

	return React.createElement(Cmp, attributes, children);
}