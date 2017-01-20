import React from 'react';

import Comment from './Comment';
import ParentComment from './ParentComment';

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
			<ParentComment comment={context} gotoComment={gotoComment} />
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
			{parentContext && renderParentContext(parentContext, gotoComment)}
			{context && renderContext(context, gotoComment)}
		</div>
	);
}
