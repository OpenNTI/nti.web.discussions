export default async function getSharingInfo (discussion, container) {
	const sharing = await discussion?.getSharing();

	return Array.isArray(sharing) ? sharing : [sharing];
}