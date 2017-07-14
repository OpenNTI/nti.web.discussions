import { getService } from 'nti-web-client';

function safeValue (value) {
	if(!value) {
		return '';
	}

	return value;
}

export function filterItemsBySearchTerm (items, searchTerm) {
	const filteredItems = searchTerm === ''
		? items
		: items.filter((item) => {
			return safeValue(item.title).toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0;
		});

	return filteredItems;
}

export function loadTopicsFromService (baseUrl, pageNum, pageSize, searchTerm, callback) {
	const batchStart = pageSize * (pageNum - 1);

	let searchParam = '';

	if(searchTerm && searchTerm.length > 0) {
		searchParam = '&searchTerm=' + searchTerm;
	}

	getService().then((service) => {
		service.getObjectAtURL(baseUrl + '?batchStart=' + batchStart + '&batchSize=' + pageSize + searchParam)
			.then((resp) => {
				const topics = resp.Items || [];
				const total = resp.FilteredTotalItemCount;
				const totalPages = Math.ceil(total / pageSize);

				callback(topics, totalPages);
			});
	});
}
