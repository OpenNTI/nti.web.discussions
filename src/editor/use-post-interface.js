import { useEffect, useState } from 'react';

import Viewer from '../viewer';

async function resolveSharingIds(sharing = []) {
	const resolve = await Viewer.Sharing.resolveEntities(sharing);

	return resolve
		.filter(Boolean)
		.map(x => Viewer.Sharing.Types.getIdForEntity(x));
}

async function getSharing(discussion, container) {
	if (discussion) {
		const sharedWith = discussion.getSharedWith(container);
		const resolved = await resolveSharingIds(sharedWith);

		return {
			sharedWith: resolved,
			canEditSharing: discussion.canEditSharing(),
		};
	}

	const containers = Array.isArray(container)
		? [...container].reverse()
		: [container];

	for (let parent of containers) {
		if (parent.getDefaultSharing) {
			const sharing = await parent.getDefaultSharing();
			const resolved = await resolveSharingIds(sharing.scopes ?? []);

			return {
				sharedWith: resolved,
				canEditSharing: !sharing.locked,
				displayNames: sharing.displayNames,
			};
		}
	}

	return null;
}

function fixError(e) {
	if (e.field === 'description' && e.declared === 'ITitledDescribedContent') {
		e.field = 'title';
	}

	return e;
}

export default function usePostInterface({
	discussion,
	initialContent = [],
	container,
	_doSave,
	afterSave,
	extraData = {},
}) {
	const [creator, setCreator] = useState(null);
	const [title, setTitle] = useState(null);
	const [content, setContent] = useState(null);

	const [sharing, setSharing] = useState(null);

	const [hasChanged, setHasChanged] = useState(
		(initialContent || []).length > 0
	);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		let unmounted = false;

		const setupDiscusion = async () => {
			const disucssionSharing = await getSharing(discussion, container);

			if (unmounted) {
				return;
			}

			setCreator(discussion?.creator ?? null);
			setTitle(discussion?.getTitle() ?? null);

			setContent({
				body: discussion
					? Viewer.Body.getLegacyBody(discussion)
					: initialContent,
				mentions: (discussion?.getMentions() ?? []).map(mention =>
					Viewer.Sharing.Types.getIdForEntity(mention.User)
				),
				tags: discussion?.getTags(),
			});

			setSharing(disucssionSharing);
		};

		setupDiscusion();

		return () => (unmounted = true);
	}, [discussion]);

	const onSave = async () => {
		const containers = Array.isArray(container)
			? container.reverse()
			: [container];
		const payload = {
			title,
			...content,
			sharedWith: sharing?.sharedWith,
			...extraData,
		};

		setSaving(true);

		if (_doSave) {
			try {
				await _doSave(payload);
				setSaving(false);
				setHasChanged(false);
			} catch (e) {
				setHasChanged(true);
				setSaving(false);
				setError(e);
			}

			return;
		}

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
			if (!hasChanged) {
				setHasChanged(true);
			}

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
		sharingDisplayNames: sharing?.displayNames,

		setSharedWith: getUpdate(sharedWith =>
			setSharing({ ...sharing, sharedWith })
		),

		hasChanged,
		isNew: !discussion,

		saving,
		onSave,

		titleError: error?.field === 'title' ? error : null,
		clearTitleError: () => error?.field === 'title' && setError(null),

		error: error?.field !== 'title' ? error : null,
		clearError: () => error?.field !== 'title' && setError(null),
	};
}
