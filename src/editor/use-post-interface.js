import React from 'react';

import Viewer from '../viewer';

export default function usePostInterface ({discussion, container, afterSave, extraData = {}}) {
	const [creator, setCreator] = React.useState(null);
	const [title, setTitle] = React.useState(null);
	const [content, setContent] = React.useState(null);

	const [hasChanged, setHasChanged] = React.useState(false);
	const [saving, setSaving] = React.useState(false);
	const [error, setError] = React.useState(null);

	React.useEffect(() => {
		setCreator(discussion?.creator);
		setTitle(discussion?.getTitle());

		setContent({
			body: discussion ? Viewer.Body.getLegacyBody(discussion) : null,
			mentions: discussion?.mentions,
			tags: discussion?.tags
		});		
	}, [discussion]);

	const onSave = async () => {
		const containers = Array.isArray(container) ? container.reverse() : [container];
		const payload = {title, ...content, ...extraData};

		setSaving(true);

		if (discussion) {
			try {
				await discussion.updatePost(payload);
				afterSave?.(discussion);
			} catch (e) {
				setHasChanged(true);
				setSaving(false);
				setError(e);
			}

			return;
		}

		try {
			for (let parent of containers.reverse()) {
				if (parent.addDiscussion) {
					const saved = await parent.addDiscussion(payload);
					afterSave?.(saved);
				}
			}
		} catch (e) {
			setHasChanged(true);
			setSaving(false);
			setError(e);
		}
	};


	const getUpdate = (fn, field) => {
		return (...args) => {
			if (!hasChanged) { setHasChanged(true); }

			fn(...args);
		};
	};

	return {
		container,

		creator,

		title,
		setTitle: getUpdate(setTitle, 'title'),

		setContent: getUpdate(setContent, 'body'),

		body: content?.body,
		mentions: content?.mentions,
		tags: content?.tags,

		hasChanged,
		isNew: !discussion,

		saving,
		onSave,

		titleError: error?.field === 'title' ? error : null,
		clearTitleError: () => error?.field === 'title' && setError(null),
		
		error: error?.field !== 'title' ? error : null,
		clearError: () => error?.field !== 'title' && setError(null)
	};
}