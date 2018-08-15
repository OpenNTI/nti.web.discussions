import React from 'react';
import PropTypes from 'prop-types';
import Logger from '@nti/util-logger';
import * as Anchors from '@nti/lib-anchors';
import { rawContent } from '@nti/lib-commons';
import { Models } from '@nti/lib-interfaces';
import { getPageContent, parseHTML, buildContentBody } from '@nti/lib-content-processing';
import { getService } from '@nti/web-client';

const logger = Logger.get('lib:components:discussions:Context');

export default class Context extends React.Component {
	static propTypes = {
		item: PropTypes.shape({ getContextData: PropTypes.func }).isRequired
	}


	state = {}


	componentDidMount () {
		this.updateContext();
	}


	componentDidUpdate ({item}) {
		if (this.props.item !== item) {
			this.updateContext();
		}
	}


	componentDidCatch (e) {
		logger.error(e);
	}


	async updateContext () {
		const { item } = this.props;

		try {
			this.setState({loading: true, error: null});
			const data = await item.getContextData();

			if (data instanceof Models.content.PageInfo) {
				return await this.setPageContext(data);
			}

			await this.setWidgetContainerContext(data);

		} catch (error) {
			this.setState({ error });
		} finally {
			this.setState({ loading: false });
		}
	}


	async setPageContext (pageInfo) {
		const { item } = this.props;
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


	async setWidgetContainerContext (obj) {
		logger.info(obj);
	}


	render () {
		const {html} = this.state;
		return (
			<div className="discussion-context-view" {...rawContent(html || '')}/>
		);
	}
}
