import {scoped} from '@nti/lib-locale';
import {Events} from '@nti/web-session';

import resolveContainerInfo from './resolve-container-info';

const t = scoped('nti-discussions.item.types.note.utils.make-post-interface', {
	commentedOn: 'Commented On',
	action: {
		hasTitle: '%(name)s commented on %(title)s',
		noTitle: '%(name)s commented'
	}
});


class NotePostInterface {
	constructor (note) {
		if (!note) {
			throw new Error('Cannot create a NotePostInterface without a note');
		}

		this.note = note;
	}

	getID () {
		return this.note.getID();
	}

	get contextId () { return null; }
	get contextTitle () { return null; }

	async getContainerInfo () {
		const info = await resolveContainerInfo(this.note);

		return {
			label: t('commentedOn'),
			...info
		};
	}

	getActionString (name, contextId, makeTitle) {
		const inContext = contextId === this.note.ContainerId;
		const title = this.note.ContainerTitle;

		if (!title || inContext) {
			return t('action.noTitle', {name});
		}

		return t('action.hasTitle', {name, title: makeTitle(title)});
	}

	get creator () { return this.note.creator; }

	get CreatedTime () { return this.note.getCreatedTime(); }
	get LastModified () { return this.note.getLastModified(); }

	get title () { return this.note.title; }
	get body () { return this.note.body; }

	get canAddComment () { return this.note.canReply(); }
	get commentCount () { return this.note.replyCount; }

	async getMostRecentComments (max) {
		const {note} = this;

		const replies = await note.getReplies();

		return replies
			.filter(r => !r.placeholder)
			.sort((a, b) => b.getCreatedTime().getTime() - a.getCreatedTime().getTime())
			.slice(0, max);

		// const replies = await note.getRecentReplies(2);

		// return replies.reverse();
	}

	addCommentAddedListener (fn) {
		const handler = (comment) => {
			if (comment.inReplyTo === this.getID()) {
				fn(comment);
			}
		};

		Events.addListener(Events.NOTE_CREATED, handler);

		return () => Events.removeListener(Events.NOTE_CREATED, handler);
	}


	addCommentUpdatedListener (fn) {
		const handler = (comment) => {
			if (comment.inReplyTo === this.getID()) {
				fn(comment);
			}
		};

		Events.addListener(Events.NOTE_UPDATED, handler);

		return () => Events.removeListener(Events.NOTE_UPDATED, handler);
	}

	addCommentDeletedListener (fn) {
		const handler = (comment) => {
			if (comment.inReplyTo === this.getID()) {
				fn(comment);
			}
		};

		Events.addListener(Events.NOTE_DELETED, handler);

		return () => Events.removeListener(Events.NOTE_DELETED, handler);
	}
}

export default function makePostInterface (note) {
	return new NotePostInterface(note);
}