import React from 'react';
import PropTypes from 'prop-types';
import {Search} from '@nti/web-commons';

import TopicList from './TopicList';
import ItemList from './ItemList';
import Breadcrumb from './Breadcrumb';
import ForumItem from './ForumItem';
import { loadTopicsFromService, filterItemsBySearchTerm } from './utils';

const STEPS = {
	FORUM_LIST: 1,
	SECTION_LIST: 2,
	BOARD_LIST: 3,
	TOPIC_LIST: 4
};
const OTHER = 'Other Discussions';

//FIXME: Spit this appart into multiple small components.
export default class DiscussionSelectionEditor extends React.Component {
	static propTypes = {
		bundle: PropTypes.object,
		onDiscussionTopicSelect: PropTypes.func
	}

	constructor (props) {
		super(props);

		Promise.all([
			this.props.bundle.getDiscussionAssets(),
			this.props.bundle.getForumList()
		]).then((result) => {
			this.onForumsLoaded(result[0], result[1]);
		});

		this.state = {
			step: STEPS.FORUM_LIST,
			searchTerm: '',
			selectedTopics: new Set()
		};
	}

	loadTopics (board, searchTerm) {
		const me = this;

		const callback = (topics) => {
			me.setState( { selectedBoard: board, searchTerm: searchTerm, step: STEPS.TOPIC_LIST, topics : topics }, () => {
				me.updateTopicSelection(new Set());
			});
		};

		loadTopicsFromService(board.getLink('contents'), callback);
	}

	onForumsLoaded (courseDiscussionTopics, forums) {
		// initialize breadcrumb for forums list
		const isSimple = courseDiscussionTopics.length === 0 && forums.length === 1 && forums[0].title === OTHER;

		let newState = { breadcrumb: [{
			title: 'Forums',
			step: STEPS.FORUM_LIST,
			onClick: () => { return this.onForumsLoaded(this.state.courseDiscussionTopics, this.state.forums); }
		}]};

		const modifiedCourseDiscussionTopics = courseDiscussionTopics.map((t) => {
			t.title = t.get('title');
			return t;
		});

		let stateCallback = () => { };

		if (isSimple) {
			stateCallback = () => { this.onForumSelect(forums[0], true); };
		}

		newState = { ...newState, step: STEPS.FORUM_LIST, forums: forums, courseDiscussionTopics: modifiedCourseDiscussionTopics };

		this.setState(newState, stateCallback);
	}

	onForumSelect = (forum, isHidden) => {
		let breadcrumb = this.state.breadcrumb ? [...this.state.breadcrumb] : [];

		breadcrumb.push({
			title: forum.title,
			step: STEPS.SECTION_LIST,
			isHidden: isHidden,
			onClick: () => { this.onForumSelect(forum, isHidden); } });

		let newState = { breadcrumb: breadcrumb };
		let stateCallback = () => { };

		const sections = forum.children;

		// in case anything was selected from course discussions, clear it out now
		this.updateTopicSelection(new Set());

		// if only one section to choose from, skip ahead to the next step automatically
		if(sections && sections.length === 1) {
			newState.selectedForum = forum;
			stateCallback = () => { this.onSectionSelect(sections[0], true); };
		}
		else {
			newState = { ...newState, step: STEPS.SECTION_LIST, selectedForum: forum, sections: sections, searchTerm: '' };
		}

		this.setState(newState, stateCallback);
	}

	onSectionSelect = (section, isHidden) => {
		let breadcrumb = this.state.breadcrumb ? [...this.state.breadcrumb] : [];

		breadcrumb.push({
			title: section.title,
			step: STEPS.BOARD_LIST,
			isHidden: isHidden,
			onClick: () => { this.onSectionSelect(section, isHidden); } });

		let newState = { breadcrumb: breadcrumb };
		let stateCallback = () => { };

		const boards = section.store.getRange().map((board) => {
			board.title = board.get('title');
			return board;
		});

		// if only one board to choose from, skip ahead to the next step automatically
		if(boards && boards.length === 1) {
			newState.selectedSection = section;
			stateCallback = () => this.onBoardSelect(boards[0], true);
		}
		else {
			newState = { ...newState, step: STEPS.BOARD_LIST, selectedSection: section, boards: boards, searchTerm: '' };
		}

		this.setState(newState, stateCallback);
	}

	onBoardSelect = (board, isHidden) => {
		let breadcrumb = this.state.breadcrumb ? [...this.state.breadcrumb] : [];

		breadcrumb.push({
			title: board.title,
			isHidden: isHidden,
			onClick: () => { this.onBoardSelect(board, isHidden); } });

		this.setState( { breadcrumb: breadcrumb }, () => { this.loadTopics(board, ''); });
	}

	onTopicSelect = (topic) => {
		let selectedTopics = this.state.selectedTopics;

		// leaving this as set operations so that multi-selection is easily
		// implementable.  if using multi-select, instead of clearing the
		// existing list, just remove the individual topic with delete()
		if(selectedTopics.has(topic)) {
			selectedTopics.clear();
		}
		else {
			selectedTopics.clear();
			selectedTopics.add(topic);
		}

		this.updateTopicSelection(selectedTopics);
	}

	// always call this to topic selection state, otherwise the container's
	// provided onDiscussionTopicSelect function won't be called
	updateTopicSelection (selectedTopics) {
		this.setState({ selectedTopics: selectedTopics });

		this.props.onDiscussionTopicSelect([...selectedTopics]);
	}

	onBreadcrumbClick = (bc) => {
		if(this.state.step === bc.step) {
			// no need to do anything if we aren't navigating elsewhere
			return;
		}

		// clear selected topics when moving back to a previous step
		this.updateTopicSelection(new Set());

		// need to trim the breadcrumb down to the selection, minus one
		// minus one because the breadcrumb click handler will push
		// the appropriate current breadcrumb
		this.setState( { searchTerm: '', breadcrumb : this.state.breadcrumb.slice(0, bc.step - 1) },
			() => {
				bc.onClick();
			});
	}

	renderBreadcrumb () {
		if(this.state.step === 1) {
			return;
		}

		return (
			<Breadcrumb breadcrumb={this.state.breadcrumb} onClick={this.onBreadcrumbClick}/>
		);
	}

	renderTopControls () {
		return (<div className="discussion-selection-topcontrols">{this.renderSearchBar()}</div>);
	}

	onSearchBarChange = (value) => {
		this.setState({ searchTerm: value });
	}

	renderSearchBar () {
		const buffered = false;


		return (
			<div className="discussion-selection-search">
				<Search value={this.state.searchTerm} buffered={buffered} onChange={this.onSearchBarChange}/>
			</div>
		);
	}

	topicSelect = (topic) => {
		this.onTopicSelect(topic);
	};

	renderForums () {
		if(this.state.forums) {
			const filteredDiscussionTopics = filterItemsBySearchTerm(this.state.courseDiscussionTopics, this.state.searchTerm);

			return (
				<div>
					<ItemList items={this.state.forums} headerText="Your Discussions" onSelect={this.onForumSelect} searchTerm={this.state.searchTerm}/>
					<div className="discussion-selection-course-discussions">
						<TopicList
							topics={filteredDiscussionTopics}
							headerText="Choose a Discussion"
							onTopicSelect={this.onTopicSelect}
							searchTerm={this.state.searchTerm}
							selectedTopics={this.state.selectedTopics}
						/>
					</div>
				</div>
			);
		}
	}

	renderSections () {
		if(this.state.selectedForum) {
			return (<ItemList items={this.state.sections} headerText="Choose a Section" onSelect={this.onSectionSelect} searchTerm={this.state.searchTerm}/>);
		}
	}

	renderBoards () {
		const { selectedSection, boards, searchTerm } = this.state;
		if(selectedSection) {
			return (<ItemList items={boards} headerText="Choose a Forum" ItemCmp={ForumItem} onSelect={this.onBoardSelect} searchTerm={searchTerm}/>);
		}
	}


	renderTopics () {
		if(!this.state.topics) {
			return null;
		}

		return (
			<TopicList
				topics={this.state.topics}
				headerText="Choose a Discussion"
				onTopicSelect={this.onTopicSelect}
				selectedTopics={this.state.selectedTopics}
				searchTerm={this.state.searchTerm}
			/>
		);
	}

	renderBody () {
		const { step } = this.state;

		if(step === STEPS.FORUM_LIST) {
			return this.renderForums();
		}
		else if(step === STEPS.SECTION_LIST) {
			return this.renderSections();
		}
		else if(step === STEPS.BOARD_LIST) {
			return this.renderBoards();
		}
		else if(step === STEPS.TOPIC_LIST) {
			return this.renderTopics();
		}
	}

	render () {
		return(
			<div>
				{this.renderTopControls()}
				{this.renderBreadcrumb()}

				{this.renderBody()}
			</div>
		);
	}
}
