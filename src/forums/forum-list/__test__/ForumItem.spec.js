/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';

import ForumItem from '../ForumItem';

const onBefore = () => {
	jest.useFakeTimers();
};

const flushPromises = () => new Promise(resolve => setImmediate(resolve));

describe('Forum Item', () => {
	beforeEach(onBefore);

	test('No Discussions - Snapshot', async () => {
		const item = {
			title: 'Forum',
			getRecentActivity: () => Promise.resolve({ TotalItemCount: 0, Items: [] })
		};
		const itemCmp = renderer.create(<ForumItem item={item} />);

		jest.runAllTimers();
		await flushPromises();

		const tree = itemCmp.toJSON();
		expect(tree).toMatchSnapshot();
	});
});