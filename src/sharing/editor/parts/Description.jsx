import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {Text, DisplayName} from '@nti/web-commons';

import Styles from '../Styles.css';

const cx = classnames.bind(Styles);
const t = scoped('nti-discussions.sharing.editor.parts.Description', {
	title: 'Sharing',
	description: {
		noOption: 'This post is unable to be shared.',
		oneOption: 'Access to this post will be limited to %(name)s.',
		multipleOptions: 'Control who will be able to access this post.'
	}
});

Description.propTypes = {
	suggestions: PropTypes.shape({
		entities: PropTypes.array,
		allowPrivate: PropTypes.bool,
		allowRestricted: PropTypes.bool
	})
};
export default function Description ({suggestions}) {
	if (!suggestions) { return null; }

	const {entities, allowPrivate, allowRestricted} = suggestions;

	const noOption = entities.length === 0 && !allowRestricted;
	const oneOption = entities.length === 1 && !allowPrivate && !allowRestricted;
	const multipleOptions = !noOption && !oneOption;

	return (
		<div className={cx('description')}>
			<Text.Base className={cx('title')}>{t('title')}</Text.Base>
			{noOption && (
				<Text.Base className={cx('description')}>
					{t('description.noOption')}
				</Text.Base>
			)}
			{oneOption && (
				<DisplayName
					className={cx('description')}
					entity={entities[0]}
					localeKey={({name}) => t('description.oneOption', {name})}
				/>
			)}
			{multipleOptions && (
				<Text.Base className={cx('description')}>
					{t('description.multipleOptions')}
				</Text.Base>
			)}
		</div>
	);
}
