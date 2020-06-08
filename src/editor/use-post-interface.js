import React from 'react';

import {hasContentChanged} from './utils';

export default function usePostInterface (discussion, container) {
	const [creator, setCreator] = React.useState(null);
	const [title, setTitle] = React.useState(null);
	const [body, setBody] = React.useState(null);
	const [mentions, setMentions] = React.useState(null);
	const [tags, setTags] = React.useState(null);

	const [saving, setSaving] = React.useState(false);

	const onSave = () => {

	};

	React.useEffect(() => {
		setCreator(discussion?.Creator);
		setTitle(discussion?.title);
		setBody(discussion?.body);
		setMentions(discussion?.mentions);
		setTags(discussion?.tags);
	}, [discussion]);

	return {
		container,

		creator,

		title,
		setTitle,

		body,
		setBody,

		mentions,
		setMentions,

		tags,
		setTags,

		hasChanged: hasContentChanged(body, discussion?.body) || hasContentChanged(title, discussion?.title),
		isNew: !discussion,

		saving,
		onSave
	};
}