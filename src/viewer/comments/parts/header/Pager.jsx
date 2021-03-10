import React from 'react';
import classnames from 'classnames/bind';

import { scoped } from '@nti/lib-locale';

import Context from '../../Context';
import Styles from '../../Styles.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-discussions.viewer.comments.parts.header.Pager', {
	first: 'First',
	last: 'Last',
});

const MaxVisible = 5;

function getPagesToShow(current, total) {
	const pages = [];

	//If we have less than the max we can show them all!
	if (total <= MaxVisible) {
		for (let i = 1; i <= total; i++) {
			pages.push(i);
		}

		return pages;
	}

	//If we have more pages than the max we try to center the current page
	//with and balance the left and right to fill the max

	let leftCount = Math.min(Math.floor(MaxVisible / 2), Math.floor(total / 2));
	for (let i = current - 1; i > 0 && leftCount > 0; i--) {
		pages.unshift(i);
		leftCount -= 1;
	}

	const rightCount = Math.min(
		MaxVisible - pages.length,
		total - pages.length
	);
	for (let i = current; i < current + rightCount && i <= total; i++) {
		pages.push(i);
	}

	if (pages.length < MaxVisible) {
		let remaining = MaxVisible - pages.length;

		for (let i = pages[0] - 1; i > 0 && remaining > 0; i--) {
			pages.unshift(i);
			remaining -= 1;
		}
	}

	return pages;
}

export default function CommentPager() {
	const { currentPage, totalPages, setPage } = React.useContext(Context);
	const current = currentPage + 1;

	if (totalPages <= 1) {
		return null;
	}

	const pages = getPagesToShow(current, totalPages);
	const firstPage = 1;
	const lastPage = totalPages;

	const renderPage = (page, label) => (
		<li
			key={page}
			className={cx('page', { current: current === page })}
			onClick={() => setPage(page - 1)}
		>
			{label || page}
		</li>
	);

	return (
		<ul className={cx('comments-pager')}>
			{pages.indexOf(firstPage) === -1 &&
				renderPage(firstPage, t('first'))}
			{pages.map(p => renderPage(p))}
			{pages.indexOf(lastPage) === -1 && renderPage(lastPage, t('last'))}
		</ul>
	);
}
