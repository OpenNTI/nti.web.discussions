import React from 'react';
import { mount } from 'enzyme';

import ItemList from '../ItemList';

/* eslint-env jest */
describe('Item list test', () => {
	test('Simple list', () => {
		const items = [
			{ title: 'item 1' },
			{ title: 'item 2' },
			{ title: 'item 3' }
		];

		const itemListCmp = mount(<ItemList items={items} searchTerm="item"/>);
		expect(itemListCmp.find('.discussion-selection-item').length).toBe(3);
	});

	test('Filtered', () => {
		const items = [
			{ title: 'item 1' },
			{ title: 'item 2' },
			{ title: 'item 3' }
		];

		const itemListCmp = mount(<ItemList items={items} searchTerm="2"/>);
		expect(itemListCmp.find('.discussion-selection-item').length).toBe(1);
	});
});
