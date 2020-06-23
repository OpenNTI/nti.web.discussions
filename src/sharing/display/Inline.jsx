import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Hooks, Errors, Loading, DisplayName, List, Icons, Text} from '@nti/web-commons';

import {getSharingInfo} from '../utils';

import Styles from './Inline.css';

const {useResolver} = Hooks;
const {isPending, isErrored, isResolved} = useResolver;

const cx = classnames.bind(Styles);
const t = scoped('nti-discussions.sharing.display.Inline', {
	error: 'Unable to load sharing info',
	onlyMe: 'Only Me'
});

SharingInlineDisplay.propTypes = {
	discussion: PropTypes.shape({
		getSharing: PropTypes.func
	}),
	container: PropTypes.any,
	limit: PropTypes.number,
	trigger: PropTypes.bool
};
export default function SharingInlineDisplay ({discussion, container, trigger, limit = 3, ...otherProps}) {
	const sharingResolver = useResolver(() => getSharingInfo(discussion, container), [discussion, container]);

	const loading = isPending(sharingResolver);
	const error = isErrored(sharingResolver) ? sharingResolver : null;
	const sharing = isResolved(sharingResolver) ? sharingResolver : null;

	const onlyMe = isResolved(sharingResolver) ? sharing.length === 0 : null;
	const icon = onlyMe ? (<Icons.Lock className={cx('icon')} />) : (<Icons.Share className={cx('icon')} />);

	return (
		<div className={cx('sharing-inline-display', {trigger})} {...otherProps} >
			<Loading.Placeholder loading={loading} fallback={<div className={cx('sharing-loading')} />}>
				{error && (<Errors.Message error={t('error')} />)}
				{isResolved(sharingResolver) && (
					<div className={cx('sharing-list')}>
						{icon}
						{onlyMe && (<Text.Base className={cx('only-me')}>{t('onlyMe')}</Text.Base>)}
						{!onlyMe && (
							<List.LimitedInline limit={limit}>
								{sharing.map((entity) => (
									<DisplayName entity={entity} key={entity.getID()} />
								))}
							</List.LimitedInline>
						)}
						{trigger && (
							<Icons.Chevron.Down className={cx('trigger-icon')} />
						)}
					</div>
				)}
			</Loading.Placeholder>
		</div>
	);
}