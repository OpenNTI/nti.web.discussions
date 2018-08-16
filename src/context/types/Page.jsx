import React from 'react';
import PropTypes from 'prop-types';
import * as Anchors from '@nti/lib-anchors';
import { rawContent } from '@nti/lib-commons';
import { getPageContent, parseHTML, buildContentBody } from '@nti/lib-content-processing';
import { Models } from '@nti/lib-interfaces';
import { getService } from '@nti/web-client';
import Logger from '@nti/util-logger';

import Registry from './Registry';


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

		// set the newly generated HTML to state for now (we will skip this step soon)
		this.setState({html: node.innerHTML});

		// pass the partial content to our widget / body builder
		const {widgets, parts} = buildContentBody(partial, await getService());

		// Now we have a map of widgets and our content parts chunked, we can render the content with html-reactifier...
		// Once this is done, we can skip the setState above.
		logger.debug(widgets, parts);
	}

	render () {
		const {html} = this.state;
		return (
			<div {...rawContent(html || '')}/>
		);
	}
}
