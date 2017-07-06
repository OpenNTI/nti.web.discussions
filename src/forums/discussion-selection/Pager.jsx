import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class Pager extends React.Component {
	static propTypes = {
		currentPage: PropTypes.number,
		totalPages: PropTypes.number,
		onPageChange: PropTypes.func
	}

	constructor (props) {
		super(props);
	}

	renderPrev () {
		if(this.props.totalPages <= 1) {
			return;
		}

		const prevClass = cx({
			'prev': true,
			'disabled': this.props.currentPage === 1
		});

		const { currentPage, onPageChange } = this.props;

		const onPrev = () => {
			if(currentPage > 1) {
				onPageChange(currentPage - 1);
			}
		};

		return (<span className={prevClass} onClick={onPrev}>Prev</span>);
	}

	renderNext () {
		if(this.props.totalPages <= 1) {
			return;
		}

		const nextClass = cx({
			'next': true,
			'disabled': this.props.currentPage === this.props.totalPages
		});

		const { currentPage, totalPages, onPageChange } = this.props;

		const onNext = () => {
			if(currentPage < totalPages) {
				onPageChange(currentPage + 1);
			}
		};

		return (<span className={nextClass} onClick={onNext}>Next</span>);
	}

	render () {
		const { currentPage, totalPages } = this.props;

		return (<div className="pager">Page {currentPage} of {totalPages}
			{this.renderPrev()}
			{this.renderNext()}
		</div>);
	}
}
