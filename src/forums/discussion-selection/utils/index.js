import {User, getService } from 'nti-web-client';

function safeValue (value) {
	if(!value) {
		return '';
	}

	return value;
}

export function filterItemsBySearchTerm (items, searchTerm) {
	const filteredItems = !searchTerm || searchTerm === ''
		? items
		: items.filter((item) => {
			return safeValue(item.title).toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0;
		});

	return filteredItems;
}

export function loadTopicsFromService (baseUrl, callback) {
	getService().then((service) => {
		service.getObjectAtURL(baseUrl)
			.then((resp) => {
				const topics = resp.Items || [];

				Promise.all(topics.map((topic) => {
					return User.resolve({ entityId: topic.Creator })
						.then((user) => {
							topic.user = user;

							return topic;
						});
				})).then((modifiedTopics) => {
					callback(modifiedTopics);
				});
			});
	});
}
