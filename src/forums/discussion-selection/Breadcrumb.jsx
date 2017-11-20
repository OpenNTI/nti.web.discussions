import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class BreadcrumbPart extends React.Component {
	static propTypes = {
		part: PropTypes.object.isRequired,
		onClick: PropTypes.func,
		inactive: PropTypes.bool
	}

	constructor (props) {
		super(props);
	}

	onPartClick = () => {
		const { onClick, part, inactive } = this.props;

		onClick && onClick(part, inactive);
	}

	render () {
		const { part, inactive } = this.props;

		const cls = cx('discussion-selection-breadcrumb', { inactive });

		return (<span onClick={this.onPartClick} className={cls}>{part.title}</span>);
	}
}


export default class Breadcrumb extends React.Component {
	static propTypes = {
		breadcrumb: PropTypes.arrayOf(PropTypes.object),
		clickHandler: PropTypes.func
	}

	constructor (props) {
		super(props);
	}

	onBreadcrumbPartClick = (part, inactive) => {
		const { clickHandler } = this.props;

		if(inactive) {
			return;
		}

		clickHandler && clickHandler(part);
	};

	renderBreadcrumbPart (bc, clickHandler, inactive) {
		if(!bc.isHidden) {
			return <BreadcrumbPart key={bc.step + '--' + bc.title} part={bc} onClick={this.onBreadcrumbPartClick} inactive={inactive}/>;
		}

		return null;
	}

	render () {
		const { breadcrumb, clickHandler } = this.props;

		if(!breadcrumb || breadcrumb.length === 0) {
			return (<div/>);
		}

		let components = [];

		// don't worry about rendering hidden breadcrumbs.. those only exist
		// for accurate step tracking in the container
		const filteredBreadcrumbs = breadcrumb.filter((bc) => { return !bc.isHidden; });

		for(let i = 0; i < filteredBreadcrumbs.length - 1; i++) {
			components.push(this.renderBreadcrumbPart(filteredBreadcrumbs[i], clickHandler));
			components.push(<span key={i + '--separator'} className="discussion-selection-breadcrumb-separator">/</span>);
		}

		components.push(this.renderBreadcrumbPart(filteredBreadcrumbs[filteredBreadcrumbs.length - 1], clickHandler, true));

		return (<div className="discussion-selection-breadcrumb-container">{components}</div>);
	}
}
