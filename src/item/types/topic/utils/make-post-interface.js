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

	get canAddComment () { return this.topic.canAddTopic(); }
	get commentCount () { return this.topic.PostCount; }
	
	async getMostRecentComments () {
		debugger;
	}
}

export default function makePostInterface (topic) {
	return new TopicPostInterface(topic);
}