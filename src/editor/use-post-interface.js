import React from 'react';

import Viewer from '../viewer';

async function getDefaultSharing (container) {
	const containers = Array.isArray(container) ? container.reverse() : [container];

	for (let parent of containers) {
		if (parent.getDefaultSharing) {
			const sharing = await parent.getDefaultSharing();

			return sharing;
		}
	}

	return null;
}

function getContent (discussion) {
	return {
		body: Viewer.Body.getLegacyBody(discussion),
		mentions: discussion.getMentions(),
		tags: discussion.getTags(),
		lockedMentions: discussion.getLockedMentions()
	};
}

async function getEmptyContent (container) {
	const defaultSharing = await getDefaultSharing(container);
	const {scopes, forcedScopes} = defaultSharing ?? {};

	return {
		body: Viewer.Body.getLegacyBody({
			getBody: () => [],
			getMentions: () => (scopes || []).map(scope => ({CanAccessContent: true, Entity: scope})),
			getTags: () => []
		}),
		mentions: [],
		tags: [],
		lockedMentions: forcedScopes
	};
}

export default function usePostInterface ({discussion, container, afterSave, extraData = {}}) {
	const [creator, setCreator] = React.useState(null);
	const [title, setTitle] = React.useState(null);
	const [content, setContent] = React.useState(null);

	const [hasChanged, setHasChanged] = React.useState(false);
	const [saving, setSaving] = React.useState(false);
	const [error, setError] = React.useState(null);

	React.useEffect(() => {
		let unmounted = false;

		const setupDiscussion = async () => {
			setCreator(discussion?.creator);
			setTitle(discussion?.getTitle());

			const newContent = discussion ? 
				getContent(discussion) : 
				await getEmptyContent(container);

			if (unmounted) { return; }

			setContent(newContent);		
		};

		setupDiscussion();
		return () => unmounted = true;
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

		setup: !!content,

		body: content?.body,
		tags: content?.tags,

		mentions: content?.mentions,
		lockedMentions: content?.lockedMentions,


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