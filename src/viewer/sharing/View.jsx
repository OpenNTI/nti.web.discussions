import React from 'react';
import PropTypes from 'prop-types';
import { Hooks } from '@nti/web-commons';

import Pills from './Pills';
import { resolveEntities, Types } from './utils';

const { useResolver } = Hooks;
const { isResolved, isPending } = useResolver;

MentionPills.resolveEntities = resolveEntities;
MentionPills.Types = Types;
MentionPills.Pills = Pills;
MentionPills.propTypes = {
	post: PropTypes.shape({
		getSharedWith: PropTypes.func,
	}),
	container: PropTypes.any,
};
export default function MentionPills({ post, container, ...otherProps }) {
	const resolver = useResolver(async () => {
		const sharing = post.getSharedWith(container);
		const resolved = await resolveEntities(sharing);

		return resolved;
	}, [post]);

	const loading = isPending(resolver);
	const sharedWith = isResolved(resolver) ? resolver : [];

	return <Pills sharedWith={sharedWith} loading={loading} {...otherProps} />;
}
