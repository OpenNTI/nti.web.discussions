import { Events } from '@nti/web-session';
import { scoped } from '@nti/lib-locale';

const t = scoped(
	'nti-discussions.item.types.blog-entry.utils.make-post-interface',
	{
		action: {
			hasTitle: '%(name)s posted on %(title)s',
			noTitle: '%(name)s',
		},
	}
);

class BlogEntryPostInterface {
	constructor(blogEntry) {
		if (!blogEntry) {
			throw new Error(
				'Cannot create a BlogPostInterface without a blogEntry'
			);
		}

		this.blogEntry = blogEntry;
	}

	getID() {
		return this.blogEntry.getID();
	}

	get contextId() {
		return this.blogEntry.ContainerId;
	}
	get contextTitle() {
		return this.blogEntry.ContainerTitle;
	}

	get creator() {
		return this.blogEntry.creator;
	}

	get CreatedTime() {
		return this.blogEntry.getCreatedTime();
	}
	get LastModified() {
		return this.blogEntry.getLastModified();
	}

	get title() {
		return this.blogEntry.title;
	}
	get body() {
		return this.blogEntry.headline && this.blogEntry.headline.body;
	}

	get isPinned() {
		return this.blogEntry.isPinned;
	}
	get isFlagged() {
		return this.blogEntry.isFlagged;
	}

	getActionString(name, contextId, makeTitle) {
		const inContext = contextId === this.blogEntry.ContainerId;
		const title = this.blogEntry.ContainerTitle;

		if (!title || inContext) {
			return t('action.noTitle', { name });
		}

		return t('action.hasTitle', { name, title: makeTitle(title) });
	}

	getReport() {
		return (this.blogEntry.Reports || [])[0];
	}

	get canAddComment() {
		return this.blogEntry.canAddComment();
	}
	get commentCount() {
		return this.blogEntry.PostCount;
	}

	async getMostRecentComments() {
		const { blogEntry } = this;

		if (blogEntry.PostCount === 0) {
			return null;
		}

		const contents = await blogEntry.getContents({
			batchSize: 2,
			sortOn: 'CreatedTime',
			sortOrder: 'descending',
			filter: ['TopLevel', 'NotDeleted'].join(','),
		});

		return contents.Items;
	}

	addCommentAddedListener(fn) {
		const handler = comment => {
			if (comment.ContainerId === this.getID() && !comment.inReplyTo) {
				fn(comment);
			}
		};

		Events.addListener(Events.BLOG_COMMENT_CREATED, handler);

		return () =>
			Events.removeListener(Events.BLOG_COMMENT_CREATED, handler);
	}

	addCommentUpdatedListener(fn) {
		const handler = comment => {
			if (comment.ContainerId === this.getID() && !comment.inReplyTo) {
				fn(comment);
			}
		};

		Events.addListener(Events.BLOG_COMMENT_UPDATED, handler);

		return () =>
			Events.removeListener(Events.BLOG_COMMENT_UPDATED, handler);
	}

	addCommentDeletedListener(fn) {
		const handler = comment => {
			if (comment.ContainerId === this.getID() && !comment.inReplyTo) {
				fn(comment);
			}
		};

		Events.addListener(Events.BLOG_COMMENT_DELETED, handler);

		return () =>
			Events.removeListener(Events.BLOG_COMMENT_DELETED, handler);
	}
}

export default function makePostInterface(blogEntry) {
	return new BlogEntryPostInterface(blogEntry);
}
