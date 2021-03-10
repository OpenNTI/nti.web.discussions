import React from 'react';
import PropTypes from 'prop-types';

import { restProps } from '@nti/lib-commons';

import { ListItem } from '../../../item';

import ItemList from './item-list';

export default class DiscussionStreamBodyList extends React.Component {
	static propTypes = {
		items: PropTypes.array,
		grouper: PropTypes.func,
		getGroupInfo: PropTypes.func,
	};

	render() {
		const { items, grouper, getGroupInfo } = this.props;

		return (
			<ItemList
				renderItem={this.renderItem}
				items={items}
				grouper={grouper}
				getGroupInfo={getGroupInfo}
			/>
		);
	}

	renderItem = item => {
		const otherProps = restProps(DiscussionStreamBodyList, this.props);

		if (!ListItem.supportsItem(item)) {
			return null;
		}

		return <ListItem item={item} {...otherProps} />;
	};
}
