import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';
import { LinkTo } from '@nti/web-routing';

import ForumCreate from '../create';

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
		activeForum: PropTypes.string,
		setActiveForum: PropTypes.func
	}

	state = {
		showCreate: false
	}

	componentDidMount () {
		this.setActiveForum();
	}

	componentDidUpdate (prevProps, prevState) {
		if (prevProps.items !== this.props.items && prevProps.loaded === false && this.props.loaded === true) {
			this.setActiveForum();
		}
	}

	setActiveForum () {
		const { items, hasForums, setActiveForum } = this.props;
		if (items && hasForums && setActiveForum) {
			this.props.setActiveForum(getFirstForum(items));
		}
	}

	toggleCreateForum = () => {
		const { showCreate } = this.state;
		this.setState({ showCreate: !showCreate });
	}

	canCreateForum () {
		const { bundle } = this.props;
		return bundle && bundle.Discussions && bundle.Discussions.hasLink('add');
	}

	renderCreate () {
		const { isSimple } = this.props;
		if (this.canCreateForum() && isSimple) {
			return <div className="action-link create-forum" onClick={this.toggleCreateForum}>{t('create')}</div>;
		}

		return null;
	}

	render () {
		const { items, loading, hasForums, activeForum } = this.props;
		const { showCreate } = this.state;
		return (
			<div className="discussion-forum-list">
				{loading && <Loading.Mask maskScreen message="Loading..." />}
				{hasForums ? (
					<ul className="forum-list">
						{
							Object.keys(items).sort().map((key, i, bins) => (
								<ForumBin
									title={key.toLowerCase() === 'other' && bins.length === 1 ? '' : t(key.toLowerCase())}
									bin={items[key]}
									key={key}
									activeForum={activeForum}
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
				{showCreate && <ForumCreate onBeforeDismiss={this.toggleCreateForum} />}
			</div>
		);
	}
}
