import React from 'react';
import PropTypes from 'prop-types';
import {restProps} from '@nti/lib-commons';
import {Loading, Layouts} from '@nti/web-commons';

import {List, Grid} from './Constants';
import Store from './Store';
import LoadingMask from './components/LoadingMask';
import ErrorCmp from './components/Error';
import EmptyCmp from './components/Empty';
import ListCmp from './list';
import GridCmp from './grid';

const {InfiniteScroll} = Layouts;

export default
@Store.connect(['items', 'loading', 'error', 'loadMore'])
class DiscussionsStream extends React.Component {
	static List = List
	static Grid = Grid

	static deriveBindingFromProps (props) {
		return {
			context: props.context,
			sort: props.sort,
			sortOrder: props.sortOrder,
			batchSize: props.batchSize
		};
	}

	static propTypes = {
		className: PropTypes.string,
		context: PropTypes.shape({
			contentsDataSource: PropTypes.shape({
				loadPage: PropTypes.func
			})
		}),
		layout: PropTypes.oneOf([List, Grid]),
		sort: PropTypes.string,
		sortOrder: PropTypes.string,
		batchSize: PropTypes.number,

		renderEmpty: PropTypes.func,

		items: PropTypes.array,
		loading: PropTypes.bool,
		error: PropTypes.any,
		loadMore: PropTypes.func
	}

	render () {
		const {className, items, loading, error, layout, loadMore} = this.props;
		const otherProps = restProps(DiscussionsStream, this.props);
		const initial = !items;
		const ItemCmp = layout === List ? ListCmp : GridCmp;

		return (
			<Loading.Placeholder loading={loading} fallback={(<LoadingMask initial={initial} />)}>
				<InfiniteScroll.Continuous className={className} loadMore={loadMore}>
					{items && !items.length && this.renderEmpty()}
					{items && (<ItemCmp items={items} {...otherProps} />)}
					{error && (<ErrorCmp error={error} initial={initial} />)}
				</InfiniteScroll.Continuous>
			</Loading.Placeholder>
		);
	}


	renderEmpty () {
		const {renderEmpty} = this.props;

		if (renderEmpty) { return renderEmpty(); }

		return (<EmptyCmp />);
	}
}
