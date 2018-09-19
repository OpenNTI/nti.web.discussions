/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';

import ForumItem from '../ForumItem';

describe('Forum Item', () => {
	test('No Discussions - Snapshot', async () => {
		const item = {
			title: 'Forum',
			TopicCount: 0,
			hasLink: () => { return false; },
			edit: () => {},
			Links: []
		};
		const itemCmp = renderer.create(<ForumItem item={item} />);
		const tree = itemCmp.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
