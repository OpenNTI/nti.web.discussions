import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class Breadcrumb extends React.Component {
	static propTypes = {
		breadcrumb: PropTypes.arrayOf(PropTypes.object),
		clickHandler: PropTypes.func
	}

	constructor (props) {
		super(props);
	}

	renderBreadcrumbPart (bc, clickHandler, inactive) {
		if(!bc.isHidden) {
			const handler = () => {
				if(inactive) {
					return;
				}

				clickHandler(bc);
			};

			const className = cx({
				'discussion-selection-breadcrumb' : true,
				inactive: inactive
			});

			return (<span onClick={handler} className={className} key={bc.step + '--' + bc.title}>{bc.title}</span>);
		}
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
