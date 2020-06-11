import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {scoped} from '@nti/lib-locale';
import {
	Hooks,
	Loading,
	Errors,
	User,
	List,
	Text
} from '@nti/web-commons';

import Styles from './Suggestions.css';
import {resolveSuggestions} from './utils';

const {Selectable} = List;

const {useResolver} = Hooks;
const {isPending, isErrored, isResolved} = useResolver;

const cx = classnames.bind(Styles);
const t = scoped('nti-discussions.editor.parts.mentions.Suggestions', {
	people: 'People'
});

MentionSuggestions.propTypes = {
	search: PropTypes.string,
	post: PropTypes.object,
	applySuggestion: PropTypes.func
};
export default function MentionSuggestions ({search, post, applySuggestion}) {
	const resolver = useResolver(() => resolveSuggestions(search, post), [search], {buffer: 300});

	const loading = isPending(resolver);
	const error = isErrored(resolver) ? resolver : null;
	const suggestions = isResolved(resolver) ? resolver : null;

	const onSelectedChange = (value) => {
		applySuggestion({
			Username: value.getID(),
			displayName: value.displayName
		});
	};

	return (
		<div className={cx('mention-suggestions', {loading})}>
			<Loading.Placeholder loading={loading} fallback={<div className={cx('loading')}><Loading.Spinner /></div>}>
				{error && (<Errors.Message error={error} />)}
				<Selectable className={cx('suggestion-list')} controlledBy={global} as="div" onSelectedChange={onSelectedChange}>
					<SuggestionList items={suggestions?.people} label={t('people')} />
				</Selectable>
			</Loading.Placeholder>
		</div>
	);
}

SuggestionList.propTypes = {
	items: PropTypes.array,
	label: PropTypes.string
};
function SuggestionList ({items, label}) {
	if (!items?.length) { return null; }

	return (
		<>
			<Text.Base className={cx('heading')}>{label}</Text.Base>
			{items.map((user) => {
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