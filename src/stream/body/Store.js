import {Stores, Mixins} from '@nti/lib-store';
import {mixin} from '@nti/lib-decorators';

function getParams (batchSize, sortOn, sortOrder, searchTerm) {
	const params = {};

	if (batchSize != null) { params['batchSize'] = batchSize; }
	if (sortOn != null) { params['sortOn'] = sortOn; }
	if (sortOrder != null) { params['sortOrder'] = sortOrder; }
	if (searchTerm != null) { params['searchTerm'] = searchTerm; }

	return params;
}

export default
@mixin(Mixins.Searchable)
class StreamStore extends Stores.BoundStore {
	cleanup () {
		if (this.cleanupListeners) {
			this.cleanupListeners();
		}
	}


	bindingDidUpdate (prevBinding) {
		const {context, sortOn, sortOrder} = this.binding;
		const {context:prevContext, sortOn: prevSortOn, sortOrder: prevSortOrder} = prevBinding;

		return context !== prevContext || sortOn !== prevSortOn || sortOrder !== prevSortOrder;
	}


	load () {
		//NOTE: even though we are defining a bindingDidUpdate, we have to check the binding again here
		//because this has the searchable mixin which will call load
		this.batchSize = this.binding.batchSize;

		if (
			this.binding.context === this.context &&
			this.binding.sortOn === this.sortOn &&
			this.binding.sortOrder === this.sortOrder && 
			this.searchTerm === this.lastSearchTerm
		) { return; }

		this.context = this.binding.context;
		this.sortOn = this.binding.sortOn;
		this.sortOrder = this.binding.sortOrder;
		this.lastSearchTerm = this.searchTerm;
		this.currentPage = null;

		if (this.cleanupListeners) { this.cleanupListeners(); }

		const onItemAdded = (item) => this.onItemAdded(item);

		this.context.addListener('item-added', onItemAdded);

		this.cleanupListeners = () => {
			this.context.removeListener('item-added', onItemAdded);
			delete this.cleanupListeners;
		};
		
		this.set({
			items: null,
			error: null
		});

		this.loadNextPage();
	}

	async loadNextPage () {
		//Don't try to load if we are already loading...
		if (this.get('loading')) { return; }

		const {context, sortOn, sortOrder, currentPage, batchSize, lastSearchTerm} = this;
		const {contentsDataSource} = context;

		this.setImmediate({
			loading: true
		});

		try {
			const page = currentPage ?
				await currentPage.loadNextPage() :
				await contentsDataSource.loadPage(0, getParams(batchSize, sortOn, sortOrder, lastSearchTerm));

			if (!page) {
				this.set({loading: false, hasMore: false});
				return;
			}

			this.currentPage = page;

			const existingItems = this.get('items') || [];
			const {hasMore, Items} = page;

			this.setImmediate({
				loading: false,
				hasMore,
				items: [...existingItems, ...Items]
			});
		} catch (e) {
			this.setImmediate({
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


	onItemAdded (item) {
		const items = this.get('items');

		this.set({
			items: [item, ...items]
		});
	}

	async itemUpdated (update) {
		try {
			const items = this.get('items');
			const updated = await Promise.all(
				items
					.map((item) => {
						if (item.NTIID === update.NTIID) {
							return item.refresh(update);
						}

						return item;
					})
			);

			this.set({
				items: updated
			});
		} catch (e) {
			//swallow
		}
	}

	itemDeleted (deleted) {
		try {
			const items = this.get('items');
			const filtered = items.filter(item => item.NTIID !== deleted.NTIID);

			this.set({
				items: filtered
			});
		} catch (e) {
			//swallow
		}
	}
}