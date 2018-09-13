import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';
import { Models } from '@nti/lib-interfaces';

import ForumCreate from '../forum-editor';

import Store from './Store';
import ForumBin from './ForumBin';
import { getFirstForum } from './utils';

const DEFAULT_TEXT = {
	forcredit: 'Enrolled For-Credit',
	open: 'Open Discussions',
	other: 'Other Discussions',
	create: 'Create a forum',
	empty: 'There are no forums to display.'
};

const t = scoped('forums.groups.sections', DEFAULT_TEXT);

export default
@Store.connect(['items', 'loading', 'loaded', 'error', 'isSimple', 'hasForums'])
class ForumListView extends React.Component {
	static deriveBindingFromProps (props) {
		return props.bundle;
	}

	static propTypes = {
		bundle: PropTypes.shape({
			getDiscussions: PropTypes.func.isRequired,
			getID: PropTypes.func.isRequired
		}),
		isSimple: PropTypes.bool,
		items: PropTypes.object,
		loading: PropTypes.bool,
		loaded: PropTypes.bool,
		hasForums: PropTypes.bool,
		setActiveForum: PropTypes.func
	}

	state = {
		showCreate: false
	}

	componentDidMount () {
		this.setActiveForum();
	}

	componentDidUpdate (prevProps) {
		if (prevProps.items !== this.props.items && prevProps.loaded === false && this.props.loaded === true) {
			this.setActiveForum();
		}
	}

	createForum = async (newForum) => {
		const { bundle: { Discussions }} = this.props;
		const forum = await Discussions.createForum({ ...newForum, MimeType: Models.forums.Forum.MimeTypes[1] });
		this.setState({ showCreate: false, activeForum: forum });
	}

	setActiveForum () {
		const { items, hasForums, setActiveForum } = this.props;
		const { activeForum } = this.state;
		if (items && hasForums && setActiveForum) {
			if (activeForum) { this.setState({ activeForum: null }); }
			setActiveForum(activeForum || getFirstForum(items));
		}
	}

	toggleCreateForum = () => {
		const { showCreate } = this.state;
		this.setState({ showCreate: !showCreate });
	}

	renderCreate () {
		const { isSimple, bundle } = this.props;
		const canCreateForum = bundle && bundle.Discussions && bundle.Discussions.hasLink('add');

		if (canCreateForum && isSimple) {
			return <div className="create-forum" onClick={this.toggleCreateForum}>{t('create')}</div>;
		}

		return null;
	}

	render () {
		const { items, loading, hasForums } = this.props;
		const { showCreate } = this.state;

		return (
			<div className="discussion-forum-list">
				<div className="forum-list-header">Forums</div>
				{loading && <Loading.Mask maskScreen message="Loading..." />}
				{hasForums ? (
					<ul className="forum-list">
						{
							Object.keys(items).sort().map((key, i, bins) => (
								<ForumBin
									title={key.toLowerCase() === 'other' && bins.length === 1 ? '' : t(key.toLowerCase())}
									bin={items[key]}
									key={key}
								/>
							))
						}
					</ul>
				) : (
					<div className="forum-list-empty">
						{t('empty')}
					</div>
				)}
				{this.renderCreate()}
				{showCreate && <ForumCreate onBeforeDismiss={this.toggleCreateForum} onSubmit={this.createForum} />}
			</div>
		);
	}
}
