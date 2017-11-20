import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';


class Part extends React.Component {
	static propTypes = {
		inactive: PropTypes.bool,
		item: PropTypes.object,
		onClick: PropTypes.func,
	}

	onClick = () => {
		const {inactive, onClick, item} = this.props;
		if(inactive) {
			return;
		}

		onClick(item);
	}

	render () {
		const {item, inactive} = this.props;
		if(item.isHidden) {
			return null;
		}

		const className = cx({
			'discussion-selection-breadcrumb' : true,
			inactive: inactive
		});

		return (
			<span
				onClick={this.onClick}
				className={className}
			>
				{item.title}
			</span>
		);
	}
}



export default class Breadcrumb extends React.Component {
	static propTypes = {
		breadcrumb: PropTypes.arrayOf(PropTypes.object),
		onClick: PropTypes.func
	}

	constructor (props) {
		super(props);
	}

	render () {
		const { breadcrumb, onClick } = this.props;

		if(!breadcrumb || breadcrumb.length === 0) {
			return (<div/>);
		}

		const getKey = i => `${i.step}--${i.title}`;
		const components = [];

		// don't worry about rendering hidden breadcrumbs.. those only exist
		// for accurate step tracking in the container
		const filteredBreadcrumbs = breadcrumb.filter((bc) => { return !bc.isHidden; });

		for(let i = 0; i < filteredBreadcrumbs.length - 1; i++) {

			const item = filteredBreadcrumbs[i];
			components.push(
				<Part key={getKey(item)} item={item} onClick={onClick}/>
			);
			components.push(
				<span key={i + '--separator'} className="discussion-selection-breadcrumb-separator">/</span>
			);

		}

		const lastItem = filteredBreadcrumbs[filteredBreadcrumbs.length - 1];

		components.push(
			<Part key={getKey(lastItem)} item={lastItem} onClick={onClick} inactive/>
		);

		return (
			<div className="discussion-selection-breadcrumb-container">{components}</div>
		);
	}
}
