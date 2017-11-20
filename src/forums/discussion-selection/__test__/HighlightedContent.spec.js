/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';

import HighlightedContent from '../HighlightedContent';

describe('Highlighted content', () => {
	test('Single hit', () => {
		const highlighted = shallow(<HighlightedContent content="abcdefg" term="cd"/>).find('.discussion-selection-highlight');

		expect(highlighted.text())
			.toBe('cd');
	});


	test('Multiple hits', () => {
		const highlighted = shallow(<HighlightedContent content="abcdefcdg" term="cd"/>).find('.discussion-selection-highlight');

		expect(highlighted.length).toBe(2);

		highlighted.map((x) => {
			expect(x.text()).toBe('cd');
		});
	});
});
