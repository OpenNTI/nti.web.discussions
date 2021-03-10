import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { scoped } from '@nti/lib-locale';
import { Hooks, Loading, Errors, User, List, Text } from '@nti/web-commons';

import Viewer from '../../../viewer';

import Styles from './Suggestions.css';
import { resolveSuggestions } from './utils';

const { Selectable } = List;

const { useResolver } = Hooks;
const { isPending, isErrored, isResolved } = useResolver;

const cx = classnames.bind(Styles);
const t = scoped('nti-discussions.editor.parts.mentions.Suggestions', {
	people: 'People',
});

MentionSuggestions.getFlyoutProps = () => ({
	className: cx('mentions-flyout'),
	constrain: true,
});
MentionSuggestions.propTypes = {
	search: PropTypes.string,
	post: PropTypes.object,
	applySuggestion: PropTypes.func,
};
export default function MentionSuggestions({ search, post, applySuggestion }) {
	const resolver = useResolver(
		() => resolveSuggestions(search, post),
		[search, post],
		{ buffer: 500 }
	);

	const loading = isPending(resolver);
	const error = isErrored(resolver) ? resolver : null;
	const suggestions = isResolved(resolver) ? resolver : null;

	const onSelectedChange = value => {
		applySuggestion(
			Viewer.Sharing.Types.getIdForEntity(value),
			value.displayName
		);
	};

	if (search === '') {
		return null;
	}

	return (
		<div className={cx('mention-suggestions', { loading })}>
			<Loading.Placeholder
				loading={loading}
				fallback={
					<div className={cx('loading')}>
						<Loading.Spinner />
					</div>
				}
			>
				{error && <Errors.Message error={error} />}
				<Selectable
					className={cx('suggestion-list')}
					controlledBy={global}
					as="div"
					onSelectedChange={onSelectedChange}
					autoFocus
				>
					<SuggestionList
						items={suggestions?.people}
						label={t('people')}
					/>
				</Selectable>
			</Loading.Placeholder>
		</div>
	);
}

SuggestionList.propTypes = {
	items: PropTypes.array,
	label: PropTypes.string,
};
function SuggestionList({ items, label }) {
	if (!items?.length) {
		return null;
	}

	return (
		<>
			<Text.Base className={cx('heading')}>{label}</Text.Base>
			{items.map(user => {
				return (
					<Selectable.Item
						key={user.getID()}
						as="div"
						value={user}
						id={user.getID()}
						className={cx('suggestion-item')}
						focusedClassName={cx('focused')}
						selectedClassName={cx('selected')}
					>
						<User.Avatar user={user} />
						<User.DisplayName user={user} />
					</Selectable.Item>
				);
			})}
		</>
	);
}
