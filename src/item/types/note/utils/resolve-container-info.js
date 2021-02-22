import { getService } from '@nti/web-client';

const readingResolver = note => {
	return {
		MimeType: note.ContainerMimeType,
		NTIID: note.ContainerId,
		title: note.ContainerTitle,
	};
};

const ContainerResolvers = {
	'application/vnd.nextthought.renderablecontentpackage': readingResolver,
	'application/vnd.nextthought.contentpackage': readingResolver,
	'application/vnd.nextthought.contentunit': readingResolver,

	'application/vnd.nextthought.ntivideo': async note => {
		const service = await getService();
		const video = await service.getObject(note.ContainerId);
		const poster = await video.getPoster();

		return {
			MimeType: note.ContainerMimeType,
			NTIID: note.ContainerId,
			title: note.ContainerTitle,
			icon: poster,
			iconClass: 'video',
		};
	},
};

export default function resolveContainerInfo(note) {
	const resolver = ContainerResolvers[note.ContainerMimeType];

	if (!resolver) {
		throw new Error('Unable to resolve note container info');
	}

	return resolver(note);
}
