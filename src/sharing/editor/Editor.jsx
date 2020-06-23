import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {Hooks, Loading, Errors} from '@nti/web-commons';

import {getSharingInfo, getSharingSuggestions} from '../utils';

import Styles from './Styles.css';
import Description from './parts/Description';

const cx = classnames.bind(Styles);

const {useResolver} = Hooks;
const {isPending, isErrored, isResolved} = useResolver;

SharingEditor.propTypes = {
	className: PropTypes.string,
	discussion: PropTypes.object,
	container: PropTypes.any
};
export default function SharingEditor ({className, discussion, container}) {
	const resolver = useResolver(async () => {
		const sharingInfo = await getSharingInfo(discussion, container);
		const suggestions = await getSharingSuggestions(discussion, container);

		return {sharingInfo, suggestions};
	}, [discussion, container]);

	const loading = isPending(resolver);
	const error = isErrored(resolver) ? resolver : null;
	const {sharingInfo, suggestions} = isResolved(resolver) ? resolver : {};

	return (
		<div className={cx('discussion-sharing-editor', className)}>
			<Loading.Placeholder loading={loading} fallback={<Loading.Spinner.Large />}>
				{error && (<Errors.Message error={error} />)}
				<Description sharingInfo={sharingInfo} suggestions={suggestions} />
			</Loading.Placeholder>
		</div>
	);
}