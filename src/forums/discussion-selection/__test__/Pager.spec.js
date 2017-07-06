import React from 'react';
import { shallow } from 'enzyme';

import Pager from '../Pager';

/* eslint-env jest */
describe('Pager test', () => {
	test('First page', () => {
		const pagerCmp = shallow(<Pager currentPage={1} totalPages={3}/>);
		expect(pagerCmp.find('.prev.disabled').length).toBe(1);
		expect(pagerCmp.find('.next').length).toBe(1);
		expect(pagerCmp.find('.next.disabled').length).toBe(0);
	});

	test('Last page', () => {
		let currPage = 3;

		const onPageChange = (newPage) => {
			currPage = newPage;
		};

		let pagerCmp = shallow(<Pager currentPage={currPage} totalPages={3} onPageChange={onPageChange}/>);
		expect(pagerCmp.find('.prev.disabled').length).toBe(0);
		expect(pagerCmp.find('.prev').length).toBe(1);
		expect(pagerCmp.find('.next.disabled').length).toBe(1);

		pagerCmp.find('.prev').simulate('click');

		setTimeout(function () {
			expect(onPageChange).toHaveBeenCalled();
		},500);

		expect(currPage).toBe(2);

		pagerCmp = shallow(<Pager currentPage={currPage} totalPages={3} onPageChange={onPageChange}/>);

		pagerCmp.find('.next').simulate('click');

		setTimeout(function () {
			expect(onPageChange).toHaveBeenCalled();
		},500);

		expect(currPage).toBe(3);
	});
});
