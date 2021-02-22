import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { scoped } from '@nti/lib-locale';
import { Text } from '@nti/web-commons';

import Styles from './SearchInfo.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-discussions.stream.body.components.SearchInfo', {
	showing: 'Showing results for "%(searchTerm)s"',
});

SearchInfo.propTypes = {
	searchTerm: PropTypes.string,
};
export default function SearchInfo({ searchTerm }) {
	if (!searchTerm) {
		return null;
	}

	return (
		<Text.Base className={cx('discussion-search-info')}>
			{t('showing', { searchTerm })}
		</Text.Base>
	);
}
