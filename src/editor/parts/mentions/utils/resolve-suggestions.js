import { getService } from '@nti/web-client';

export default async function resolveSuggestions(search, post) {
	if (!search) {
		return null;
	}

	const service = await getService();
	const searchUrl = service.getUserSearchURL(search);
	const batch = await service.getBatch(searchUrl);

	return {
		people: batch.Items,
	};
}
