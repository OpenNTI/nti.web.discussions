import React from 'react';
import { mount, shallow } from 'enzyme';

import Breadcrumb from '../Breadcrumb';

/* eslint-env jest */
describe('Breadcrumb test', () => {
	test('Simple breadcrumb', () => {
		const breadcrumb = [
			{ step: 1, title: 'First' },
			{ step: 2, title: 'Second' },
			{ step: 3, title: 'Last' }
		];

		const clickHandler = () => { };

		let bcCmp = mount(<Breadcrumb breadcrumb={breadcrumb} clickHandler={clickHandler}/>);
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

		const bcCmp = shallow(<Breadcrumb breadcrumb={breadcrumb}/>);
		const allBCs = bcCmp.find('.discussion-selection-breadcrumb');

		// only two items, since 'Second' was hidden, it should not be rendered
		expect(allBCs.length).toBe(2);

		const inactive = bcCmp.find('.inactive');

		expect(inactive.length).toBe(1);
		expect(inactive.text()).toBe('Last');
	});
});
