import React from 'react';
import PropTypes from 'prop-types';
import {Search} from 'nti-web-commons';

import TopicList from './TopicList';
import ItemList from './ItemList';
import Breadcrumb from './Breadcrumb';
import Pager from './Pager';
import { loadTopicsFromService } from './utils';

const STEPS = {
	FORUM_LIST: 1,
	SECTION_LIST: 2,
	BOARD_LIST: 3,
	TOPIC_LIST: 4
};

const PAGE_SIZE = 5, SEARCH_DELAY = 500;

export default class DiscussionSelectionEditor extends React.Component {
	static propTypes = {
		bundle: PropTypes.object,
		onDiscussionTopicSelect: PropTypes.func
	}

	constructor (props) {
		super(props);

		this.props.bundle.getForumList().then((forums) => {
			this.onForumsLoaded(forums);
		});

		this.state = {
			step: STEPS.FORUM_LIST,
			currentPage: 1,
			totalPages: 0,
			searchTerm: '',
			selectedTopics: new Set()
		};
	}

	loadTopics (currentPage, board, searchTerm) {
		const me = this;

		const callback = (topics, totalPages) => {
			me.setState( { currentPage: currentPage, selectedBoard: board, searchTerm: searchTerm, step: STEPS.TOPIC_LIST, topics : topics, totalPages: totalPages }, () => {
				me.updateTopicSelection(new Set());
			});
		};

		loadTopicsFromService(board.getLink('contents'), currentPage, PAGE_SIZE, searchTerm, callback);
	}

	onForumsLoaded (forums) {
		// initialize breadcrumb for forums list
		let newState = { breadcrumb: [{
			title: 'Forums',
			step: STEPS.FORUM_LIST,
			onClick: () => { return this.onForumsLoaded(this.state.forums); }
		}]};
		let stateCallback = () => { };

		// if only one forum to choose from, skip ahead to the next step automatically
		if(forums && forums.length === 1) {
			newState.forums = forums;
			stateCallback = () => {
				this.onForumSelect(forums[0], true);
			};
		}
		else {
			newState = { ...newState, step: STEPS.FORUM_LIST, forums: forums };
		}

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

		this.setState( { breadcrumb: breadcrumb }, () => { this.loadTopics(1, board, ''); });
	}

	onTopicSelect (topic) {
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

	renderBreadcrumb () {
		const me = this;

		const clickHandler = (bc) => {
			if(me.state.step === bc.step) {
				// no need to do anything if we aren't navigating elsewhere
				return;
			}

			// clear selected topics when moving back to a previous step
			me.updateTopicSelection(new Set());

			// need to trim the breadcrumb down to the selection, minus one
			// minus one because the breadcrumb click handler will push
			// the appropriate current breadcrumb
			this.setState( { searchTerm: '', breadcrumb : me.state.breadcrumb.slice(0, bc.step - 1) },
				() => {
					bc.onClick();
				});
		};

		return (<Breadcrumb breadcrumb={this.state.breadcrumb} clickHandler={clickHandler}/>);
	}

	renderSearchBar () {
		const me = this, buffered = false;

		const doSearch = (searchTerm) => {
			if(me.state.step === STEPS.TOPIC_LIST) {
				me.loadTopics(1, me.state.selectedBoard, searchTerm);
			}
		};

		const onChange = (value) => {
			me.setState({ searchTerm: value });

			// implement a delay here (instead of relying on underlying
			// BufferedInput, which is deprecated).  delay is needed so
			// that server calls aren't made on every keystroke
			const delay = SEARCH_DELAY;

			let {inputBufferDelayTimer} = me;
			if (inputBufferDelayTimer) {
				clearTimeout(inputBufferDelayTimer);
			}

			me.inputBufferDelayTimer = setTimeout(() => doSearch(value), delay);
		};

		return (<div className="discussion-selection-search">
			<Search value={this.state.searchTerm} buffered={buffered} onChange={onChange}/>
		</div>);
	}

	renderPager () {
		if(this.state.totalPages === 0) {
			return;
		}

		const me = this;

		const onPageChange = (newPage) => {
			me.loadTopics(newPage, this.state.selectedBoard, this.state.searchTerm);
		};

		if(this.state.step === STEPS.TOPIC_LIST) {
			return (<Pager currentPage={this.state.currentPage} totalPages={this.state.totalPages} onPageChange={onPageChange}/>);
		}
	}

	renderForums () {
		if(this.state.forums) {
			return (<ItemList items={this.state.forums} onSelect={this.onForumSelect} searchTerm={this.state.searchTerm}/>);
		}
	}

	renderSections () {
		if(this.state.selectedForum) {
			return (<ItemList items={this.state.sections} onSelect={this.onSectionSelect} searchTerm={this.state.searchTerm}/>);
		}
	}

	renderBoards () {
		if(this.state.selectedSection) {
			return (<ItemList items={this.state.boards} onSelect={this.onBoardSelect} searchTerm={this.state.searchTerm}/>);
		}
	}

	renderTopics () {
		if(!this.state.topics) {
			return null;
		}

		const me = this;

		const onTopicSelect = (topic) => {
			me.onTopicSelect(topic);
		};

		return (<TopicList topics={this.state.topics} onTopicSelect={onTopicSelect} selectedTopics={this.state.selectedTopics}/>);
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
		return(<div>
			{this.renderSearchBar()}
			{this.renderBreadcrumb()}
			{this.renderPager()}
			{this.renderBody()}
		</div>);
	}
}
