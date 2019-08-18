import {Stores} from '@nti/lib-store';

export default class StreamStore extends Stores.BoundStore {
	load () {
		this.batchSize = this.binding.batchSize;

		if (this.binding.context === this.context && this.binding.sort === this.sort && this.binding.sortOrder === this.sortOrder) { return; }

		this.context = this.binding.context;
		this.sort = this.binding.sort;
		this.sortOrder = this.binding.sortOrder;
		this.currentPage = null;

		this.set({
			items: null,
			error: null
		});

		this.loadNextPage();
	}

	async loadNextPage () {
		//Don't try to load if we are already loading...
		if (this.get('loading')) { return; }

		const {context, sort, sortOrder, currentPage, batchSize} = this;
		const {contentsDataSource} = context;
		
		this.set({
			loading: true
		});

		try {
			const page = currentPage ?
				await currentPage.loadNextPage() :
				await contentsDataSource.loadPage(0, {batchSize, sort, sortOrder});

			this.currentPage = page;

			const existingItems = this.get('items') || [];
			const {hasMore, Items} = page;

			this.set({
				loading: false,
				hasMore,
				items: [...existingItems, ...Items]
			});
		} catch (e) {
			this.set({
				loading: false,
				error: e,
				hasMore: false
			});
		}
	}

	get loadMore () {
		const hasMore = this.get('hasMore');

		return hasMore ? (() => this.loadNextPage()) : null;
	}
}