import React from 'react';
import PropTypes from 'prop-types';
import * as Anchors from '@nti/lib-anchors';
import { getPageContent, parseHTML, buildContentBody } from '@nti/lib-content-processing';
import { Models } from '@nti/lib-interfaces';
import { getService } from '@nti/web-client';
import Logger from '@nti/util-logger';
import getRenderer from 'html-reactifier';

import Registry from './Registry';

const isWidget = tag => tag === 'widget';
const objectsToPlaceholders = x => typeof x === 'string' ? x : `<widget id="${x.guid}"/>`;

const logger = Logger.get('lib:components:discussions:context:Page');

export default
@Registry.register('application/vnd.nextthought.pageinfo')
class PageInfo extends React.Component {
	static propTypes = {
		item: PropTypes.instanceOf(Models.content.PageInfo),
		for: PropTypes.shape({
			applicableRange: PropTypes.object,
			ContainerId: PropTypes.string
		}),
	}

	static cssClassName = 'pageinfo'

	state = {}


	componentDidMount () {
		this.setPageContext();
	}


	componentDidUpdate (previous) {
		if (this.props.item !== previous.item || this.props.for !== previous.for) {
			this.setPageContext();
		}
	}


	async setPageContext () {
		const { item: pageInfo, for: item } = this.props;
		// we don't want to load all the extra page data (such as notes) so don't use loadPageDescriptor(), we call the
		// getPageContent() directly and build our own widget map AFTER we locate our range.
		const { contentRaw } = await getPageContent(pageInfo);
		const pageId = pageInfo.getID();

		// create an empty document to hold our snippet
		const partial = document.implementation.createHTMLDocument();
		// parse the content into a document
		const fullDoc = await parseHTML(contentRaw);

		// Locate our note's DOM Range...
		const range = Anchors.toDomRange( item.applicableRange, fullDoc, fullDoc, item.ContainerId, pageId );

		if (!range) {
			logger.debug('applicableRange could not be located for item: %o', item);
			return;
		}

		// Expand out the range to include a little more than just selected bits.
		Anchors.expandRangeToIncludeImmutableBlocks(range);
		range.setStartBefore(range.startContainer);
		range.setEndAfter(range.endContainer);

		const {body: node} = partial;

		// copy out the selected range into our empty document,
		node.append(range.cloneContents());

		// pass the partial content to our widget / body builder
		const {widgets, parts} = buildContentBody(partial, await getService());

		// Now we have a map of widgets and our content parts chunked, we can render the content with html-reactifier...
		const html = parts.map(objectsToPlaceholders).join('');
		this.setState({
			widgets,
			renderer: getRenderer(html, isWidget)
		});
	}


	render () {
		const {renderer} = this.state;
		return renderer
			? renderer(React, (...args) => this.renderWidget(...args))
			: null;
	}


	renderWidget (tagName, {id}) {
		const {widgets} = this.state;
		const data = (widgets || {})[id];

		if (!data) {
			return null;
		}

		return (
			<div>Hey! {id}</div>
		);
	}
}
