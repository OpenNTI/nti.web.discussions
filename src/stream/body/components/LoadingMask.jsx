import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {Loading} from '@nti/web-commons';

DiscussionStreamLoadingMask.propTypes = {
	initial: PropTypes.bool
};
export default function DiscussionStreamLoadingMask ({initial}) {
	return (
		<div className={cx('loading-mask', {initial})}>
			{initial && (<Loading.Spinner.Large />)}
			{!initial && (<Loading.Spinner />)}
		</div>
	);
}
