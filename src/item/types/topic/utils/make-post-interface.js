class TopicPostInterface {
	constructor (topic) {
		if (!topic) {
			throw new Error('Cannot create a TopicPostInterface without a topic');
		}

		this.topic = topic;
	}

	getID () {
		return this.topic.getID();
	}

	async getContainerTitle () {
		return null;
	}
	
	get creator () { return this.topic.creator; }
	
	get CreatedTime () { return this.topic.getCreatedTime(); }
	get LastModified () { return this.topic.getLastModified(); }
	
	get title () { return this.topic.title;	}
	get body () { return this.topic.headline && this.topic.headline.body; }

	get canAddComment () { return this.topic.canAddComment(); }
	get commentCount () { return this.topic.PostCount; }
	
	async getMostRecentComments () {
		const {topic} = this;

		if (topic.PostCount === 0) { return null; }
		if (topic.PostCount === 1 && topic.NewestDescendant) { return [topic.NewestDescendant];	}

		const contents = await topic.getContents({batchSize: 2, sortOn: 'CreatedTime', sortOrder: 'descending'});

		return contents.Items;
	}
}

export default function makePostInterface (topic) {
	return new TopicPostInterface(topic);
}