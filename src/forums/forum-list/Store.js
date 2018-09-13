import { Stores } from '@nti/lib-store';
import AppDispatcher from '@nti/lib-dispatcher';

import {binDiscussions} from './utils';

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
			Discussions.removeListener('change', this.onChange.bind(this));
		}

		if (ParentDiscussions) {
			ParentDiscussions.removeListener('change', this.onChange.bind(this));
		}
	}

	setupListeners () {
		const { Discussions, ParentDiscussions } = this.binding;

		if (Discussions) {
			Discussions.addListener('change', this.onChange.bind(this));
		}

		if (ParentDiscussions) {
			ParentDiscussions.addListener('change', this.onChange.bind(this));
		}
	}

	onChange = () => {
		this.load();
	}

	async load () {
		if (!this.binding) { return; }

		this.set(INIT_STATE);
		this.cleanup();
		this.setupListeners();

		try {
			const [section, parent] = await this.binding.getDiscussions(true);

			if (section) {
				section.NTIID = this.binding.Discussions.getID();
			}

			if (parent) {
				parent.NTIID = this.binding.ParentDiscussions.getID();
			}

			const bins = binDiscussions(section, parent);
			const isSimple = (bins && Object.keys(bins).length === 1 && bins.Other) ? true : false;

			const itemsWithForums = Object.values(bins).filter(x => x && x.Section && x.Section.forums && x.Section.forums.length > 0);
			const hasForums = itemsWithForums && itemsWithForums.length > 0;

			this.set({ loading: false, loaded: true, items: bins, isSimple, hasForums });
		} catch (error) {
			this.set({
				loading: false,
				loaded: true,
				error: true,
				items: {}
			});
		}
	}
}
