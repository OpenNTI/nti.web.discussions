import React from 'react';
import PropTypes from 'prop-types';
import {Hooks} from '@nti/web-commons';

import Pills from './Pills';

const {useResolver} = Hooks;
const {isResolved} = useResolver;

MentionPills.Pills = Pills;
MentionPills.propTypes = {
	discussion: PropTypes.shape({
		getMentions: PropTypes.func,
		getLockedMentions: PropTypes.func
	})
};
export default function MentionPills ({discussion, ...otherProps}) {
	const resolver = useResolver(async () => {
		const mentions = await discussion.getMentions();
		const locked = await discussion.getLockedMentions();

		return {mentions, locked};
	},[discussion]);

	const {mentions = [], locked = []} = isResolved(resolver) ? resolver : {};

	return (
		<Pills mentions={mentions} lockedMentions={locked} />
	);
}