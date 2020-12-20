/* eslint-env jest */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import Breadcrumb from '../Breadcrumb';

describe('Breadcrumb test', () => {
	test('Simple breadcrumb', async () => {
		const breadcrumb = [
			{ step: 1, title: 'First' },
			{ step: 2, title: 'Second' },
			{ step: 3, title: 'Last' }
		];

		const clickHandler = jest.fn();

		const result = render(<Breadcrumb breadcrumb={breadcrumb} onClick={clickHandler}/>);
		const allBCs = result.container.querySelectorAll('.discussion-selection-breadcrumb');

		expect(allBCs.length).toBe(3);

		const inactive = result.container.querySelectorAll('.inactive');

		expect(inactive.length).toBe(1);
		expect(inactive[0].textContent).toBe('Last');

		fireEvent.click(result.container.querySelector('.discussion-selection-breadcrumb'));

		await waitFor(() => expect(clickHandler).toHaveBeenCalled());
	});

	test('Simple breadcrumb with hidden', async () => {
		const breadcrumb = [
			{ step: 1, title: 'First' },
			{ step: 2, title: 'Second', isHidden: true },
			{ step: 3, title: 'Last' }
		];

		const result = render(<Breadcrumb breadcrumb={breadcrumb}/>);
		const allBCs = result.container.querySelectorAll('.discussion-selection-breadcrumb');

		// only two items, since 'Second' was hidden, it should not be rendered
		expect(allBCs.length).toBe(2);

		const inactive = result.container.querySelectorAll('.inactive');

		expect(inactive.length).toBe(1);
		expect(inactive[0].textContent).toBe('Last');
	});
});
