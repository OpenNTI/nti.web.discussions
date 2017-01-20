import React from 'react';
import cx from 'classnames';
import {Panel} from 'nti-modeled-content';
import {DisplayName} from 'nti-web-commons';
import {scoped} from 'nti-lib-locale';

const DEFAULT_TEXT = {
	inReplyTo: 'In reply to %(name)s'
};

const t = scoped('TOPIC_PARTICIPATION_SUMMARY_PARENT_COMMENT', DEFAULT_TEXT);

export default class ParentComment extends React.Component {
	static propTypes = {
		comment: React.PropTypes.object,
		gotoComment: React.PropTypes.func
	}


	setBodyRef = x => this.bodyRef = x

	constructor (props) {
		super(props);

		this.state = {
			expanded: false
		};
	}


	getBodyHeight () {
		return this.bodyRef ? this.bodyRef.clientHeight + 10 : 0;
	}


	gotoComment = () => {

	}


	getReplyToString = (data) => {
		return t('inReplyTo', data);
	}


	toggleExpanded = () => {
		const {expanded} = this.state;

		this.setState({
			expanded: !expanded
		});
	}


	render () {
		const {expanded} = this.state;
		const {comment} = this.props;
		const {creator, body} = comment;
		const cls = cx('topic-participation-summary-parent-comment', {expanded});
		const maxHeight = expanded ? this.getBodyHeight() : 0;
		const bodyStyles = {
			maxHeight: `${maxHeight}px`
		};

		return (
			<div className={cls}>
				<div className="header" onClick={this.toggleExpanded}>
					<DisplayName entity={creator} localeKey={this.getReplyToString} />
					<i className="icon-chevron-right" />
				</div>
				<div className="body" style={bodyStyles}>
					<div className="body-container" ref={this.setBodyRef}>
						<Panel body={body}/>
					</div>
				</div>
			</div>
		);
	}
}
