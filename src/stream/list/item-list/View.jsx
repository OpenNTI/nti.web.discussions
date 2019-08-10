import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import {restProps} from '@nti/lib-commons';

import Styles from './View.css';
import {groupItems} from './utils';
import {DefaultGroup} from './Constants';

const cx = classnames.bind(Styles);

export default class ItemList extends React.Component {
	static propTypes = {
		className: PropTypes.string,

		renderItem: PropTypes.func.isRequired,
		items: PropTypes.arrayOf(
			PropTypes.shape({
				getID: PropTypes.func
			})
		),

		grouper: PropTypes.func,
		getGroupInfo: PropTypes.func
	}

	state = {groups: []}

	componentDidMount () {
		this.setup(this.props);
	}

	componentDidUpdate (prevProps) {
		const {items, grouper} = this.props;
		const {items:oldItems, grouper: oldGrouper} = prevProps;

		if (items !== oldItems || grouper !== oldGrouper) {
			this.setup(this.props);
		}
	}

	setup (props = this.props) {
		const {items, grouper} = this.props;

		this.setState({
			groups: groupItems(items, grouper)
		});
	}

	render () {
		const {groups} = this.state;

		return groups.length === 1 ?
			this.renderSingleGroup(groups[0]) :
			this.renderMultipleGroups(groups);
	}

	renderSingleGroup (group) {
		const {name, items} = group;

		if (name !== DefaultGroup) { return this.renderMultipleGroups([group]); }

		return this.renderItems(
			items.map(item => this.renderItem(item))
		);
	}

	renderMultipleGroups (groups) {
		return this.renderItems(
			groups.map(group => this.renderGroup(group))
		);
	}


	renderGroup (group) {
		const {getGroupInfo} = this.props;
		const {name, items} = group;
		const {className, label, labelClassName, itemListClassName} = getGroupInfo ? (getGroupInfo(name) || {}) : {};

		return (
			<li key={name} className={cx('item-list-group', className)}>
				{label && (<div className={labelClassName}>{label}</div>)}
				<ul className={cx('group-list', itemListClassName)}>
					{items.map(item => this.renderItem(item))}
				</ul>
			</li>
		);
	}


	renderItem (item) {
		const {renderItem} = this.props;
		const key = item.getID();

		return (
			<li key={key} className={cx('item-list-item')}>
				{renderItem(item)}
			</li>
		);
	}


	renderItems (items) {
		const {className} = this.props;
		const otherProps = restProps(ItemList, this.props);

		return (
			<ul className={cx('nti-item-list', className)} {...otherProps}>
				{items}
			</ul>
		);
	}
}