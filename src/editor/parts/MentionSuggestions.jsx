import React from 'react';
import PropTypes from 'prop-types';
import {getService} from '@nti/web-client';
import {Hooks, Loading, Errors, User} from '@nti/web-commons';

const {useResolver} = Hooks;
const {isPending, isErrored, isResolved} = useResolver;

UserSuggestions.propTypes = {
	search: PropTypes.string,
	applySuggestions: PropTypes.func
};
export default function UserSuggestions ({search}) {
	const resolver = useResolver(async () => {
		const service = await getService();
		const searchUrl = service.getUserSearchURL(search);
		const batch = await service.getBatch(searchUrl);

		return batch.Items;
	}, [search], {buffer: 300});

	const loading = isPending(resolver);
	const error = isErrored(resolver) ? resolver : null;
	const suggestions = isResolved(resolver) ? resolver : null;

	return (
		<Loading.Placeholder loading={loading} fallback={<Loading.Spinner />}>
			{error && (<Errors.Message error={error} />)}
			{suggestions && (
				<ul>
					{suggestions.map((user) => {
						return (
							<li key={user.getID()}>
								<User.DisplayName user={user} />
							</li>
						);
					})}
				</ul>
			)}
		</Loading.Placeholder>
	);
}