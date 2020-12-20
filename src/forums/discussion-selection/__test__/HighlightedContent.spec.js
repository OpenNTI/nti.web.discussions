/* eslint-env jest */
import React from 'react';
import { render } from '@testing-library/react';

import HighlightedContent from '../HighlightedContent';

describe('Highlighted content', () => {
	test('Single hit', () => {
		const {container} = render(<HighlightedContent content="abcdefg" term="cd"/>);

		expect(container.querySelector('.discussion-selection-highlight').textContent)
			.toBe('cd');
	});


	test('Multiple hits', () => {
		const {container} = render(<HighlightedContent content="abcdefcdg" term="cd"/>);

		const highlighted = container.querySelectorAll('.discussion-selection-highlight');

		expect(highlighted.length).toBe(2);

		for (const x of highlighted) {
			expect(x.textContent).toBe('cd');
		}
	});
});
