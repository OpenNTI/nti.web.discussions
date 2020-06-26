import React from 'react';
import PropTypes from 'prop-types';
import {Hooks} from '@nti/web-commons';

import Pills from './Pills';

const {useResolver} = Hooks;
const {isResolved} = useResolver;

MentionPills.Pills = Pills;
MentionPills.propTypes = {
	post: PropTypes.shape({
		getMentions: PropTypes.func,
		getLockedMentions: PropTypes.func
	}),
	container: PropTypes.any
};
export default function MentionPills ({post, container, ...otherProps}) {
	const resolver = useResolver(async () => {
		const mentions = await post.getMentions();
		const locked = await post.getLockedMentions(container);

		return {mentions, locked};
	},[post]);

	const {mentions = [], locked = []} = isResolved(resolver) ? resolver : {};

	return (
		<Pills mentions={mentions} lockedMentions={locked} />
	);
}