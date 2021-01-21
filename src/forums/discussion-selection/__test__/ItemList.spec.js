/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

import ItemList from '../ItemList';

describe('Item list test', () => {
	test('Simple list', async () => {
		const items = [
			{ title: 'item 1' },
			{ title: 'item 2' },
			{ title: 'item 3' }
		];

		const {getAllByTestId} = render(<ItemList items={items} searchTerm="item"/>);
		expect(getAllByTestId('discussion-selection-item').length).toBe(3);

		const tree = renderer.create(<ItemList items={items} searchTerm="item" />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	test('Filtered', async () => {
		const items = [
			{ title: 'item 1' },
			{ title: 'item 2' },
			{ title: 'item 3' }
		];

		const {getAllByTestId} = render(<ItemList items={items} searchTerm="2"/>);
		expect(getAllByTestId('discussion-selection-item').length).toBe(1);

		const tree = renderer.create(<ItemList items={items} searchTerm="2" />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	test('NTI-6655: Open Bin Forums', () => {
		const items = [
			{
				MimeType: 'application/vnd.nextthought.forums.communityforum',
				NTIID: 'tag:nextthought.com,2011-10:unknown-OID-0x055933:5573657273:hC4MEZYP0nC',
				title: 'Open Announcements',
				displayTitle: 'Annoucments',
				ContainerId: 'tag:nextthought.com,2011-10:Public-OID-0x05592f:5573657273:hC4MEZYP0nF',
				get: function (property) { return this[property]; }
			},
			{
				MimeType: 'application/vnd.nextthought.forums.communityforum',
				NTIID: 'tag:nextthought.com,2011-10:unknown-OID-0x055930:5573657273:hC4MEZYP0nE',
				title: 'Open Discussions',
				displayTitle: 'Discussions',
				ContainerId: 'tag:nextthought.com,2011-10:Public-OID-0x05592f:5573657273:hC4MEZYP0nF',
				get: function (property) { return this[property]; }
			}
		];
		const tree = renderer.create(<ItemList items={items} onSelect={() => {}} searchTerm="" />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
