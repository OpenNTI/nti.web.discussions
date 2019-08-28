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

	get contextId () { return this.topic.ContainerId; }
	get contextTitle () { return this.topic.ContainerTitle; }
	
	get creator () { return this.topic.creator; }
	
	get CreatedTime () { return this.topic.getCreatedTime(); }
	get LastModified () { return this.topic.getLastModified(); }
	
	get title () { return this.topic.title;	}
	get body () { return this.topic.headline && this.topic.headline.body; }

	get canAddComment () { return this.topic.canAddComment(); }
	get commentCount () { return this.topic.PostCount; }

	getReport () {
		return (this.topic.Reports || [])[0];
	}
	
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
		const handler = (comment) => {
			if (comment.ContainerId === this.getID()) {
				fn(comment);
			}
		};

		Events.addListener(Events.TOPIC_COMMENT_UPDATED, handler);

		return () => Events.removeListener(Events.TOPIC_COMMENT_UPDATED, handler);
	}

	addCommentDeletedListener (fn) {
		const handler = (comment) => {
			if (comment.ContainerId === this.getID()) {
				fn(comment);
			}
		};

		Events.addListener(Events.TOPIC_COMMENT_DELETED, handler);

		return () => Events.removeListener(Events.TOPIC_COMMENT_DELETED, handler);
	}
}

export default function makePostInterface (topic) {
	return new TopicPostInterface(topic);
}