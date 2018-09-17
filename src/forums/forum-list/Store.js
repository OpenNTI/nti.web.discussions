import { Stores } from '@nti/lib-store';
import AppDispatcher from '@nti/lib-dispatcher';

import {binDiscussions} from './utils';
import {FORUM_LIST_REFRESH, FORUM_TOPIC_CHANGE} from './constants';

const INIT_STATE = {
	loading: true,
	loaded: false,
	error: false,
	items: {},
	hasForums: false,
	isSimple: false
};

export default class FourmListStore extends Stores.BoundStore {
	constructor () {
		super();

		this.set(INIT_STATE);
	}

	cleanup () {
		if (!this.binding) { return; }
		const { Discussions, ParentDiscussions } = this.binding;

		if (Discussions) {
			Discussions.removeListener('change', this.load);
		}

		if (ParentDiscussions) {
			ParentDiscussions.removeListener('change', this.load);
		}

		delete this.forums;
	}

	clearRefreshForum () {
		this.set({ refreshForumId: null });
	}

	handleDispatch = (event) => {
		const { action: { type } } = event;
		if (type === FORUM_LIST_REFRESH) {
			this.load();
		} else if (type === FORUM_TOPIC_CHANGE) {
			const { action: { response = {} } } = event;
			this.refreshForum(response.forum);
		}
	}

	load = async () => {
		if (!this.binding) { return; }

		this.set(INIT_STATE);
		this.cleanup();
		this.setupListeners();

		try {
			const [section, parent] = await this.binding.getDiscussions(true);
			this.forums = new Map();

			if (section) {
				section.NTIID = this.binding.Discussions.getID();
				if (section.Items) {
					section.Items.forEach(forum => this.forums.set(forum.getID(), forum));
				}
			}

			if (parent) {
				parent.NTIID = this.binding.ParentDiscussions.getID();
				if (parent.Items) {
					parent.Items.forEach(forum => this.forums.set(forum.getID(), forum));
				}
			}

			const bins = binDiscussions(section, parent);
			const isSimple = (bins && Object.keys(bins).length === 1 && bins.Other) ? true : false;
			const hasForums = (section && section.TotalItemCount > 0) || (parent && parent.TotalItemCount > 0);

			this.set({ loading: false, loaded: true, items: bins, isSimple, hasForums });
		} catch (error) {
			this.set({ loading: false, loaded: true, error: true, items: {} });
		}
	}

	refreshForum (forumId) {
		if (!this.forums || !this.forums.has(forumId)) { return; }

		this.set({ refreshForumId: forumId });
	}

	setupListeners () {
		const { Discussions, ParentDiscussions } = this.binding;

		if (Discussions) {
			Discussions.addListener('change', this.load);
		}

		if (ParentDiscussions) {
			ParentDiscussions.addListener('change', this.load);
		}

		if (!this.dispatcher) {
			this.dispatcher = AppDispatcher.register(this.handleDispatch);
		}
	}
}
