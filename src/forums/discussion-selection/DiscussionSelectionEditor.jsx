import React from 'react';
import PropTypes from 'prop-types';
import {Search} from '@nti/web-commons';

import TopicList from './TopicList';
import ItemList from './ItemList';
import Breadcrumb from './Breadcrumb';
import ForumItem from './ForumItem';
import { filterItemsBySearchTerm } from './utils';

const STEPS = {
	FORUM_LIST: 1,
	SECTION_LIST: 2,
	BOARD_LIST: 3,
	TOPIC_LIST: 4
};

const SearchBox = styled.div`
	float: right;
	width: 350px;
`;

const TopControls = styled.div`
	padding-bottom: 50px;
`;

const PaddedTopicList = styled(TopicList)`
	padding-top: 50px;
`;

const push = (x, y) => [...(x || []), y];

export default class DiscussionSelectionEditor extends React.Component {
	static propTypes = {
		bundle: PropTypes.object,
		onDiscussionTopicSelect: PropTypes.func
	}

	state = {
		step: STEPS.FORUM_LIST,
		searchTerm: '',
		selectedTopics: new Set()
	}

	async componentDidMount () {

		const [topics, forums] = await Promise.all([

			this.props.bundle.getDiscussionAssets(),
			// this.props.bundle.getCourseDiscussions()
			// 	.then(x => x.Items || x),

			this.props.bundle.getForumList(),
			// this.props.bundle.getDiscussions()
			// 	.then(x => x.filter(Boolean).reduce((a, _) => [...a, ...(_?.Items || [])], []))
		]);

		this.onForumsLoaded(topics, forums);
	}

	async loadTopics (board, searchTerm) {

		const topics = (await board.fetchLink('contents'))?.Items || [];

		this.setState( {
			selectedBoard: board,
			searchTerm: searchTerm,
			step: STEPS.TOPIC_LIST,
			topics
		}, () => {
			this.updateTopicSelection(new Set());
		});

	}

	onForumsLoaded (courseDiscussionTopics, forums) {
		// initialize breadcrumb for forums list
		const isSimple = courseDiscussionTopics.length === 0 && forums.length === 1 && forums[0].title === 'Other Discussions';

		this.setState({
			breadcrumb: push(null, {
				title: 'Forums',
				step: STEPS.FORUM_LIST,
				// isHidden: isSimple,
				activate: () =>
					this.onForumsLoaded(this.state.courseDiscussionTopics, this.state.forums)
			}),
			step: STEPS.FORUM_LIST,
			forums,
			courseDiscussionTopics
		}, () => {
			if (isSimple) {
				this.onForumSelect(forums[0], true);
			}
		});
	}

	onForumSelect = (forum, isHidden) => {
		const breadcrumb = push(this.state.breadcrumb, {
			title: forum.title,
			step: STEPS.SECTION_LIST,
			isHidden,
			activate: () => this.onForumSelect(forum, isHidden)
		});

		//FIXME: This is a ExtJS legacy property...
		const sections = forum.children;

		// in case anything was selected from course discussions, clear it out now
		this.updateTopicSelection(new Set());

		// if only one section to choose from, skip ahead to the next step automatically
		if(sections?.length <= 1) {
			this.setState({breadcrumb, selectedForum: forum}, () => { this.onSectionSelect(sections?.[0], true); });
		}
		else {
			this.setState({
				breadcrumb,
				step: STEPS.SECTION_LIST,
				selectedForum: forum,
				sections,
				searchTerm: ''
			});
		}
	}

	onSectionSelect = (section, isHidden) => {
		let breadcrumb = push(this.state.breadcrumb, {
			title: section.title,
			step: STEPS.BOARD_LIST,
			isHidden: isHidden,
			activate: () => this.onSectionSelect(section, isHidden)
		});

		//FIXME: This is using ExtJS objects...
		const boards = section.store.getRange();

		// if only one board to choose from, skip ahead to the next step automatically
		if(boards?.length === 1) {
			return this.setState({
				breadcrumb,
				selectedSection: section
			}, () =>
				this.onBoardSelect(boards[0], true)
			);
		}

		this.setState({
			breadcrumb,
			step: STEPS.BOARD_LIST,
			selectedSection: section,
			boards,
			searchTerm: ''
		});
	}

	onBoardSelect = (board, isHidden) => {
		this.setState({
			breadcrumb: push(this.state.breadcrumb, {
				title: board.title,
				isHidden,
				activate: () => this.onBoardSelect(board, isHidden)
			})
		}, () =>
			this.loadTopics(board, '')
		);
	}

	onTopicSelect = (topic) => {
		const selected = new Set(this.state.selectedTopics);
		const hadTopic = selected.has(topic);

		// leaving this as set operations so that multi-selection is easily
		// implementable.  if using multi-select, instead of clearing the
		// existing list, just remove the individual topic with delete()

		//selected.delete(topic);
		selected.clear();

		if (!hadTopic) {
			selected.add(topic);
		}

		this.updateTopicSelection(selected);
	}


	onBreadcrumbClick = (bc) => {
		const {step, breadcrumb} = this.state;
		if(step === bc.step) {
			// no need to do anything if we aren't navigating elsewhere
			return;
		}

		// clear selected topics when moving back to a previous step
		this.updateTopicSelection(new Set());

		this.setState( {
			searchTerm: '',
			// need to trim the breadcrumb down to the selection, minus one
			// minus one because the breadcrumb click handler will push
			// the appropriate current breadcrumb
			breadcrumb: breadcrumb.slice(0, bc.step - 1)
		}, bc.activate);
	}


	// always call this to topic selection state, otherwise the container's
	// provided onDiscussionTopicSelect function won't be called
	updateTopicSelection (selectedTopics) {
		this.setState({ selectedTopics });

		this.props.onDiscussionTopicSelect([...selectedTopics]);
	}


	onSearchBarChange = (searchTerm) => this.setState({ searchTerm })


	render () {
		const { step, searchTerm, breadcrumb } = this.state;

		return(
			<div>
				<TopControls data-testid="discussion-selection-topcontrols">
					<SearchBox data-testid="discussion-selection-search">
						<Search value={searchTerm} buffered={false} onChange={this.onSearchBarChange}/>
					</SearchBox>
				</TopControls>

				{step !== 1 && (
					<Breadcrumb breadcrumb={breadcrumb} onClick={this.onBreadcrumbClick}/>
				)}

				{step === STEPS.FORUM_LIST && <Forums {...this.state} onForumSelect={this.onForumSelect} onSelect={this.onTopicSelect} /> }

				{step === STEPS.SECTION_LIST && <Sections {...this.state} onSelect={this.onSectionSelect} /> }

				{step === STEPS.BOARD_LIST && <Boards {...this.state} onSelect={this.onBoardSelect} /> }

				{step === STEPS.TOPIC_LIST && <Topics {...this.state} onSelect={this.onTopicSelect} /> }
			</div>
		);
	}
}


function Forums ({courseDiscussionTopics, forums, onForumSelect, onSelect, selectedTopics, searchTerm}) {
	if(!forums) {
		return null;
	}

	const filteredDiscussionTopics = filterItemsBySearchTerm(courseDiscussionTopics, searchTerm);

	return (
		<>
			<ItemList
				headerText="Your Discussions"
				emptyMessage="No discussions found"
				items={forums}
				onSelect={onForumSelect}
				searchTerm={searchTerm}
			/>

			<PaddedTopicList
				data-testid="discussion-selection-course-discussions"
				topics={filteredDiscussionTopics}
				headerText="Choose a Discussion"
				onTopicSelect={onSelect}
				searchTerm={searchTerm}
				selectedTopics={selectedTopics}
			/>

		</>
	);
}


function Sections ({onSelect, selectedForum, sections, searchTerm}) {
	if(!selectedForum) {
		return null;
	}

	return (
		<ItemList
			headerText="Choose a Section"
			emptyMessage="No sections found"
			items={sections}
			onSelect={onSelect}
			searchTerm={searchTerm}
		/>
	);
}


function Boards ({ boards, onSelect, selectedSection, searchTerm }) {
	if(!selectedSection) {
		return null;
	}

	return (
		<ItemList
			headerText="Choose a Forum"
			emptyMessage="No forums found"
			items={boards}
			ItemCmp={ForumItem}
			onSelect={onSelect}
			searchTerm={searchTerm}
		/>
	);

}


function Topics ({onSelect, topics, selectedTopics, searchTerm}) {
	if(!topics) {
		return null;
	}

	return (
		<TopicList
			topics={topics}
			headerText="Choose a Discussion"
			emptyMessage="No discussions found"
			onTopicSelect={onSelect}
			selectedTopics={selectedTopics}
			searchTerm={searchTerm}
		/>
	);
}
