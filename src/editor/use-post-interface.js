import React from 'react';

export default function usePostInterface ({discussion, container, afterSave}) {
	const [creator, setCreator] = React.useState(null);
	const [title, setTitle] = React.useState(null);
	const [content, setContent] = React.useState(null);

	const [hasChanged, setHasChanged] = React.useState(false);
	const [saving, setSaving] = React.useState(false);
	const [error, setError] = React.useState(null);

	React.useEffect(() => {
		setCreator(discussion?.Creator);
		setTitle(discussion?.title);

		setContent({
			body: discussion?.body,
			mentions: discussion?.mentions,
			tags: discussion?.tags
		});		
	}, [discussion]);

	const onSave = async () => {
		const containers = Array.isArray(container) ? container.reverse() : [container];

		setSaving(true);

		// if (discussion) {
		// 	//TODO: fill this out
		// 	return;
		// }

		// try {
		// 	for (let parent of containers.reverse()) {
		// 		if (parent.addDiscussion) {
		// 			const saved = await parent.addDiscussion({title, ...content});
		// 			afterSave?.(saved);
		// 		}
		// 	}
		// } catch (e) {
		// 	setHasChanged(true);
		// 	setSaving(false);
		// 	setError(e);
		// }
	};


	const getUpdate = (fn) => {
		return (...args) => {
			if (error) { setError(null); }
			if (!hasChanged) { setHasChanged(true); }

			fn(...args);
		};
	};

	return {
		container,

		creator,

		title,
		setTitle: getUpdate(setTitle),

		setContent: getUpdate(setContent),

		body: content?.body,
		mentions: content?.mentions,
		tags: content?.tags,

		hasChanged,
		isNew: !discussion,

		saving,
		onSave
	};
}