import './View.scss';
import React from 'react';
import PropTypes from 'prop-types';

import { decorate } from '@nti/lib-commons';
import { Loading } from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';
import { encodeForURI } from '@nti/lib-ntiids';

import ForumCreate from '../forum-editor';

import Store from './Store';
import ForumBin from './ForumBin';
import { getFirstForum } from './utils';

const DEFAULT_TEXT = {
	forcredit: 'Enrolled For-Credit',
	open: 'Open Discussions',
	other: 'Other Discussions',
	create: 'Create a forum',
	empty: 'There are no forums to display.',
};

const t = scoped('forums.groups.sections', DEFAULT_TEXT);

class ForumListView extends React.Component {
	static deriveBindingFromProps(props) {
		return props.bundle;
	}

	static propTypes = {
		bundle: PropTypes.shape({
			getDiscussions: PropTypes.func.isRequired,
			getForumType: PropTypes.func.isRequired,
			getID: PropTypes.func.isRequired,
			Discussions: PropTypes.shape({
				createForum: PropTypes.func,
				hasLink: PropTypes.func,
			}),
		}),
		isSimple: PropTypes.bool,
		items: PropTypes.object,
		loading: PropTypes.bool,
		loaded: PropTypes.bool,
		hasForums: PropTypes.bool,
		setFirstForum: PropTypes.func,
		activeForumId: PropTypes.string,
	};

	static contextTypes = {
		router: PropTypes.object,
	};

	state = {
		showCreate: false,
	};

	async componentDidMount() {
		const { bundle } = this.props;

		this.setFirstForum();

		await bundle.getDiscussions();

		this.forceUpdate();
	}

	componentDidUpdate(prevProps) {
		if (
			prevProps.items !== this.props.items &&
			prevProps.loaded === false &&
			this.props.loaded === true
		) {
			this.setFirstForum();
		}
	}

	createForum = async newForum => {
		const { bundle } = this.props;
		const { router } = this.context;
		const forum = await bundle.Discussions.createForum({
			...newForum,
			MimeType: bundle.getForumType(),
		});
		this.setState({ showCreate: false });
		router.history.push(
			`${router.baseroute}/${encodeForURI(forum.getID())}`
		);
	};

	setFirstForum() {
		const {
			items,
			hasForums,
			setFirstForum,
			activeForumId,
			loading,
		} = this.props;

		if (!setFirstForum || activeForumId || loading) {
			return;
		}

		if (items && hasForums) {
			setFirstForum(getFirstForum(items));
		} else {
			setFirstForum(null);
		}
	}

	toggleCreateForum = () => {
		const { showCreate } = this.state;
		this.setState({ showCreate: !showCreate });
	};

	renderCreate() {
		const { isSimple, bundle } = this.props;
		const canCreateForum =
			bundle && bundle.Discussions && bundle.Discussions.hasLink('add');

		if (canCreateForum && isSimple) {
			return (
				<div className="create-forum" onClick={this.toggleCreateForum}>
					{t('create')}
				</div>
			);
		}

		return null;
	}

	render() {
		const { items, loading, hasForums } = this.props;
		const { showCreate } = this.state;

		return (
			<div className="discussion-forum-list">
				<div className="forum-list-header">Forums</div>
				{loading && <Loading.Mask maskScreen message="Loading..." />}
				{!loading && hasForums && (
					<ul className="forum-list">
						{Object.keys(items)
							.sort()
							.map((key, i, bins) => (
								<ForumBin
									title={
										key.toLowerCase() === 'other' &&
										bins.length === 1
											? ''
											: t(key.toLowerCase())
									}
									bin={items[key]}
									key={key}
								/>
							))}
					</ul>
				)}
				{!hasForums && !loading && (
					<div className="forum-list-empty">{t('empty')}</div>
				)}
				{this.renderCreate()}
				{showCreate && (
					<ForumCreate
						onBeforeDismiss={this.toggleCreateForum}
						onSubmit={this.createForum}
					/>
				)}
			</div>
		);
	}
}

export default decorate(ForumListView, [
	Store.connect([
		'items',
		'loading',
		'loaded',
		'error',
		'isSimple',
		'hasForums',
	]),
]);
