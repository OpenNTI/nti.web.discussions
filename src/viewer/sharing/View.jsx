import React from 'react';
import PropTypes from 'prop-types';
import {Hooks} from '@nti/web-commons';
import {getService} from '@nti/web-client';

import Pills from './Pills';
import * as Types from './Types';

const {useResolver} = Hooks;
const {isResolved} = useResolver;

MentionPills.Types = Types;
MentionPills.Pills = Pills;
MentionPills.propTypes = {
	post: PropTypes.shape({
		getSharedWith: PropTypes.func
	}),
	container: PropTypes.any
};
export default function MentionPills ({post, container, ...otherProps}) {
	const resolver = useResolver(async () => {
		const service = await getService();
		const sharing = post.getSharedWith(container);

		const entities = await Promise.all(
			sharing.map(s => (
				typeof s === 'string' ? service.resolveEntity(s).catch(() => null) : s
			))
		);

		return entities.filter(Boolean);
	}, [post]);

	const sharedWith = isResolved(resolver) ? resolver : [];

	return (
		<Pills sharedWith={sharedWith} {...otherProps} />
	);
}