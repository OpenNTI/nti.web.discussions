import React from 'react';

import Comment from './Comment';

function renderContext (context, gotoComment) {
	return (
		<div className="context">
			<Comment comment={context} gotoComment={gotoComment} />
		</div>
	);
}

function renderParentContext (context, gotoComment) {
	return (
		<div className="parent-context">
			<span>In Reply To:</span>
			<Comment comment={context} gotoComment={gotoComment} />
		</div>
	);
}

ParticipationItem.propTypes = {
	item: React.PropTypes.object,
	gotoComment: React.PropTypes.func
};
export default function ParticipationItem ({item, gotoComment}) {
	const {Context:context, ParentContext:parentContext} = item;

	return (
		<div className="topic-participation-summary-participation-item">
			{context && renderContext(context, gotoComment)}
			{parentContext && renderParentContext(context, gotoComment)}
		</div>
	);
}
