import {Events} from '@nti/web-session';
import {scoped} from '@nti/lib-locale';

const t = scoped('nti-discussions.item.types.topic.utils.make-post-interface', {
	action: {
		hasTitle: '%(name)s posted on %(title)s',
		noTitle: '%(name)s'
	}
});

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

	get isPinned () { return this.topic.isPinned; }

	getActionString (name, contextId, makeTitle) {
		const inContext = contextId === this.topic.ContainerId;
		const title = this.topic.ContainerTitle;

		if (!title || inContext) {
			return t('action.noTitle', {name});
		}

		return t('action.hasTitle', {name, title: makeTitle(title)});
	}

	getReport () {
		return (this.topic.Reports || [])[0];
	}
	
	get canAddComment () { return this.topic.canAddComment(); }
	get commentCount () { return this.topic.PostCount; }

	
	async getMostRecentComments () {
		const {topic} = this;

		if (topic.PostCount === 0) { return null; }

		const contents = await topic.getContents({batchSize: 2, sortOn: 'CreatedTime', sortOrder: 'descending', 'filter': ['TopLevel', 'NotDeleted'].join(',')});

		return contents.Items;
	}

	addCommentAddedListener (fn) {
		const handler = (comment) => {
			if (comment.ContainerId === this.getID() && !comment.inReplyTo) {
				fn(comment);
			}
		};

		Events.addListener(Events.TOPIC_COMMENT_CREATED, handler);

		return () => Events.removeListener(Events.TOPIC_COMMENT_CREATED, handler);
	}


	addCommentUpdatedListener (fn) {
		const handler = (comment) => {
			if (comment.ContainerId === this.getID() && !comment.inReplyTo) {
				fn(comment);
			}
		};

		Events.addListener(Events.TOPIC_COMMENT_UPDATED, handler);

		return () => Events.removeListener(Events.TOPIC_COMMENT_UPDATED, handler);
	}

	addCommentDeletedListener (fn) {
		const handler = (comment) => {
			if (comment.ContainerId === this.getID() && !comment.inReplyTo) {
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