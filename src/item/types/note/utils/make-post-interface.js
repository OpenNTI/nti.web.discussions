import {scoped} from '@nti/lib-locale';

const t = scoped('nti-discussions.item.types.note.utils.make-post-interface', {
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

	async getContainerTitle () {
		const {note} = this;

		try {
			const context = await note.getContextData();
			
			return context.Title || context.title;
		} catch (e) {
			//swallow
		}
	}

	getActionString (name, title) {
		if (!title) {
			return t('action.noTitle', {name});
		}

		return t('action.hasTitle', {name, title});
	}

	get creator () { return this.note.creator; }

	get CreatedTime () { return this.note.getCreatedTime(); }
	get LastModified () { return this.note.getLastModified(); }

	get title () { return this.note.title; }
	get body () { return this.note.body; }

	get canAddComment () { return this.note.canReply(); }
	get commentCount () { return this.note.replyCount; }

	async getMostRecentComments () {
		const {note} = this;

		const replies = await note.getRecentReplies(2);

		return replies.reverse();
	}
}

export default function makePostInterface (note) {
	return new NotePostInterface(note);
}