import {Events} from '@nti/web-session';

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

		const contents = await topic.getContents({batchSize: 2, sortOn: 'CreatedTime', sortOrder: 'descending', 'filter': 'TopLevel'});

		return contents.Items;
	}

	addCommentAddedListener (fn) {
		const handler = (comment) => {
			if (comment.ContainerId === this.getID()) {
				fn(comment);
			}
		};

		Events.addListener(Events.TOPIC_COMMENT_CREATED, handler);

		return () => Events.removeListener(Events.TOPIC_COMMENT_CREATED, handler);
	}


	addCommentUpdatedListener (fn) {
		const updatedHandler = (comment) => {
			if (comment.ContainerId === this.getID()) {
				fn(comment);
			}
		};

		const deletedHandler = async (comment) => {
			if (comment.ContainerId === this.getID()) {
				await comment.refresh();
				fn(comment);
			}
		};

		Events.addListener(Events.TOPIC_COMMENT_UPDATED, updatedHandler);
		Events.addListener(Events.TOPIC_COMMENT_DELETED, deletedHandler);

		return () => {
			Events.removeListener(Events.TOPIC_COMMENT_UPDATED, updatedHandler);
			Events.removeListener(Events.TOPIC_COMMENT_DELETED, deletedHandler);
		};
	}
}

export default function makePostInterface (topic) {
	return new TopicPostInterface(topic);
}