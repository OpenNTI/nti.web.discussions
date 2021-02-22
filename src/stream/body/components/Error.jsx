import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Error as ErrorCmp } from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';

const t = scoped('nti-discussions.stream.components.Error', {
	unableToLoadMore: 'Unable to Load More',
});

DiscussionsStreamError.propTypes = {
	error: PropTypes.any,
	initial: PropTypes.bool,
};
export default function DiscussionsStreamError({ error, initial }) {
	return (
		<div className={cx('channel-stream-error', { initial })}>
			{initial && <ErrorCmp error={error} />}
			{!initial && (
				<span className={cx('message')}>{t('unableToLoadMore')}</span>
			)}
		</div>
	);
}
