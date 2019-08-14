import React from 'react';
import PropTypes from 'prop-types';
import {Loading, Layouts} from '@nti/web-commons';

import Store from './Store';
import LoadingMask from './components/LoadingMask';
import ErrorCmp from './components/Error';
import EmptyCmp from './components/Empty';

const {InfiniteScroll} = Layouts;

export default
@Store.connect(['items', 'loading', 'error', 'loadMore'])
class DicussionsStream extends React.Component {
	static deriveBindingFromProps (props) {
		return {
			context: props.context,
			sort: props.sort,
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
		sort: PropTypes.string,
		batchSize: PropTypes.number,

		renderEmpty: PropTypes.func,

		items: PropTypes.array,
		loading: PropTypes.bool,
		error: PropTypes.any,
		loadMore: PropTypes.func
	}

	render () {
		const {className, items, loading, error, layout, loadMore} = this.props;
		const initial = !items;

		return (
			<Loading.Placeholder loading={loading} fallback={(<LoadingMask initial={initial} />)}>
				<InfiniteScroll.Continuous className={className} loadMore={loadMore}>
					{items && !items.length && this.renderEmpty()}
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
