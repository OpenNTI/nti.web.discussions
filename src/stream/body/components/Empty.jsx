import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { scoped } from '@nti/lib-locale';
import { EmptyState } from '@nti/web-commons';

const t = scoped('nti-discussions.stream.body.components.Empty', {
	message: "There isn't any activity here yet.",
	search: {
		message: 'There are no results matching "%(searchTerm)s".',
	},
});

EmptyStream.propTypes = {
	searchTerm: PropTypes.string,
};
export default function EmptyStream({ searchTerm }) {
	const header = searchTerm
		? t('search.message', { searchTerm })
		: t('message');

	return (
		<div className={cx('empty-discussion-stream')}>
			<EmptyState header={header} />
		</div>
	);
}
