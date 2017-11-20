/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';

import Breadcrumb from '../Breadcrumb';

describe('Breadcrumb test', () => {
	test('Simple breadcrumb', () => {
		const breadcrumb = [
			{ step: 1, title: 'First' },
			{ step: 2, title: 'Second' },
			{ step: 3, title: 'Last' }
		];

		function clickHandler () { }

		let bcCmp = mount(<Breadcrumb breadcrumb={breadcrumb} onClick={clickHandler}/>);
		const allBCs = bcCmp.find('.discussion-selection-breadcrumb');

		expect(allBCs.length).toBe(3);

		const inactive = bcCmp.find('.inactive');

		expect(inactive.length).toBe(1);
		expect(inactive.text()).toBe('Last');

		bcCmp.find('.discussion-selection-breadcrumb').first().simulate('click');

		setTimeout(function () {
			expect(clickHandler).toHaveBeenCalled();
		},500);

		bcCmp = bcCmp.update();
	});

	test('Simple breadcrumb with hidden', () => {
		const breadcrumb = [
			{ step: 1, title: 'First' },
			{ step: 2, title: 'Second', isHidden: true },
			{ step: 3, title: 'Last' }
		];

		const bcCmp = mount(<Breadcrumb breadcrumb={breadcrumb}/>);
		const allBCs = bcCmp.find('.discussion-selection-breadcrumb');

		// only two items, since 'Second' was hidden, it should not be rendered
		expect(allBCs.length).toBe(2);

		const inactive = bcCmp.find('.inactive');

		expect(inactive.length).toBe(1);
		expect(inactive.text()).toBe('Last');
	});
});
