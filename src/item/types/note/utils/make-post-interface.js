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

	get creator () { return this.note.creator; }

	get CreatedTime () { return this.note.getCreatedTime(); }
	get LastModified () { return this.note.getLastModified(); }

	get title () { return this.note.title; }
	get body () { return this.note.body; }

	get canAddComment () { return this.note.canReply(); }
	get commentCount () { return this.note.replyCount; }

	async getMostRecentComments () {

	}
}

export default function makePostInterface (note) {
	return new NotePostInterface(note);
}