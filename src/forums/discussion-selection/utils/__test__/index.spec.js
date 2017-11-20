/* eslint-env jest */
import { filterItemsBySearchTerm } from '../';

describe('Filter items by search term', () => {
	test('Filter simple list', () => {
		const original = [
			{title: 'UPPERCASE'},
			{title: 'lowercase'},
			{title: 'nomatch'}
		];

		const expected = [
			{title: 'UPPERCASE'},
			{title: 'lowercase'}
		];

		const searchTerm = 'cAsE';

		expect(filterItemsBySearchTerm(original, searchTerm))
			.toMatchObject(expected);
	});
});
