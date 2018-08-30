import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import * as Anchors from '@nti/lib-anchors';
import { getPageContent, parseHTML, buildContentBody } from '@nti/lib-content-processing';
import { Models } from '@nti/lib-interfaces';
import { getService } from '@nti/web-client';
import { NTIContent } from '@nti/web-commons';
import Logger from '@nti/util-logger';
import getRenderer from 'html-reactifier';

import Registry from './Registry';

import getType from './index';

const isWidget = tag => tag === 'widget';
const objectsToPlaceholders = x => typeof x === 'string' ? x : `<widget id="${x.guid}"/>`;

const getBlock = x => x && x.nodeType === 3 ? x.parentNode : x;

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
		const { contentRaw, styles } = await getPageContent(pageInfo);
		const pageId = pageInfo.getID();

		// create an empty document to hold our snippet
		const partial = document.implementation.createHTMLDocument('-');//IE requires a title argument
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
		if (range.endContainer !== getBlock(range.endContainer)) {
			range.setEndAfter(range.endContainer);
		}
		range.setStartBefore(getBlock(range.startContainer));

		const {body: node} = partial;

		// copy out the selected range into our empty document,
		node.appendChild(range.cloneContents());
		Array.from(node.querySelectorAll('[href]')).forEach(a => a.removeAttribute('href'));
		Array.from(node.querySelectorAll('[onClick]')).forEach(a => a.removeAttribute('onClick'));

		// pass the partial content to our widget / body builder
		const {widgets, parts} = buildContentBody(partial, await getService());

		const widgetOnly = parts.filter(x => x).every(x => typeof x === 'object');

		// Now we have a map of widgets and our content parts chunked, we can render the content with html-reactifier...
		const html = parts.map(objectsToPlaceholders).join('');
		this.setState({
			widgets,
			widgetOnly,
			styles,
			renderer: getRenderer(html, isWidget)
		});
	}


	render () {
		const {renderer, styles = [], widgetOnly} = this.state;
		return !renderer
			? null : (
				<NTIContent className={cx('discussion-context-view-pageinfo', 'snippet', {'only-widget': widgetOnly})}>
					{styles.map((x, i) => (
						<style scoped key={i}>{x}</style>
					))}
					{renderer(React, (...args) => this.renderWidget(...args))}
				</NTIContent>
			);
	}


	renderWidget (tagName, {id}) {
		const {widgets} = this.state;
		const widget = (widgets || {})[id];

		if (!widget) {
			return null;
		}

		//Pick a widget
		const Widget = getType(widget);

		return (
			<Widget item={widget} />
		);
	}
}
