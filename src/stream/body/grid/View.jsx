import React from 'react';
import PropTypes from 'prop-types';
import {restProps} from '@nti/lib-commons';

import {Card} from '../../../item';

import ItemGrid from './item-grid';

export default class DiscussionStreamBodyGrid extends React.Component {
	static propTypes = {
		items: PropTypes.array,
		columns: PropTypes.number
	}

	render () {
		const {items, columns} = this.props;

		return (
			<ItemGrid
				renderItem={this.renderItem}
				items={items}
				columns={columns || 2}
				gap={10}
			/>
		);
	}


	renderItem = (item) => {
		const otherProps = restProps(DiscussionStreamBodyGrid, this.props);

		if (!Card.supportsItem(item)) { return null; }

		return (
			<Card item={item} {...otherProps} />
		);
	}
}
