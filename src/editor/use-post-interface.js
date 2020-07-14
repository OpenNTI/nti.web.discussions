import React from 'react';

import Viewer from '../viewer';

async function resolveSharingIds (sharing = []) {
	const resolve = await Viewer.Sharing.resolveEntities(sharing);

	return resolve.filter(Boolean).map(x => Viewer.Sharing.Types.getIdForEntity(x));
}

async function getSharing (discussion, container) {
	if (discussion) {
		const sharedWith = discussion.getSharedWith(container);
		const resolved = await resolveSharingIds(sharedWith);

		return {
			sharedWith: resolved,
			canEditSharing: discussion.canEditSharing()
		};
	}

	const containers = Array.isArray(container) ? ([...container]).reverse() : [container];

	for (let parent of containers) {
		if (parent.getDefaultSharing) {
			const sharing = await parent.getDefaultSharing();
			const resolved = await resolveSharingIds(sharing.scopes ?? []);

			return {
				sharedWith: resolved,
				canEditSharing: !sharing.locked
			};
		}
	}

	return null;
}

function fixError (e) {
	if (e.field === 'description' && e.declared === 'ITitledDescribedContent') {
		e.field = 'title';
	}

	return e;
}


export default function usePostInterface ({discussion, initialContent = [], container, afterSave, extraData = {}}) {
	const [creator, setCreator] = React.useState(null);
	const [title, setTitle] = React.useState(null);
	const [content, setContent] = React.useState(null);

	const [sharing, setSharing] = React.useState(null);

	const [hasChanged, setHasChanged] = React.useState(initialContent.length > 0);
	const [saving, setSaving] = React.useState(false);
	const [error, setError] = React.useState(null);

	React.useEffect(() => {
		let unmounted = false;

		const setupDiscusion = async () => {
			const disucssionSharing = await getSharing(discussion, container);

			if (unmounted) { return; }

			setCreator(discussion?.creator);
			setTitle(discussion?.getTitle());
			
			setContent({
				body: discussion ? Viewer.Body.getLegacyBody(discussion) : initialContent,
				mentions: (discussion?.getMentions() ?? []).map(mention => Viewer.Sharing.Types.getIdForEntity(mention.User)),
				tags: discussion?.getTags()
			});

			setSharing(disucssionSharing);
		};

		setupDiscusion();

		return () => unmounted = true;
	}, [discussion]);

	const onSave = async () => {
		const containers = Array.isArray(container) ? container.reverse() : [container];
		const payload = {
			title,
			...content,
			sharedWith: sharing?.sharedWith,
			...extraData
		};

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
			setError(fixError(e));
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
		setTitle: getUpdate(setTitle),

		setContent: getUpdate(setContent),

		setup: !!content,

		body: content?.body,
		tags: content?.tags,

		mentions: content?.mentions,

		sharedWith: sharing?.sharedWith,
		canEditSharing: sharing?.canEditSharing,

		setSharedWith: getUpdate((sharedWith) => setSharing({...sharing, sharedWith})),

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