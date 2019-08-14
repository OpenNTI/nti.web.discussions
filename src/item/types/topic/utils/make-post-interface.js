class TopicPostInterface {
	constructor (topic) {
		if (!topic) {
			throw new Error('Cannot create a TopicPostInterface without a topic');
		}

		this.topic = topic;
	}
	
	get containerId () { return this.topic.containerId; }
	
	get Creator () { return this.topic.Creator; }
	
	get CreatedTime () { return this.topic.getCreatedTime(); }
	get LastModified () { return this.topic.getLastModified(); }
	
	get title () { return this.topic.title;	}
	get body () { return this.topic.headline && this.topic.headline.body; }

	get canAddComment () { return this.topic.canAddTopic(); }
	get commentCount () { return this.topic.PostCount; }
	get mostRecentComment () {
		const {NewestDescendant: newest} = this.topic;

		return newest && newest.isComment ? newest : null;
	}

	get contextData () { return null; }
}

export default function makePostInterface (topic) {
	return new TopicPostInterface(topic);
}