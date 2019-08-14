import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Loading} from '@nti/web-commons';

import Styles from './LoadingMask.css';

const cx = classnames.bind(Styles);

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