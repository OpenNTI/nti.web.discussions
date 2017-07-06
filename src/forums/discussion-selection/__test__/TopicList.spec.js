import React from 'react';
import { shallow } from 'enzyme';

import TopicList from '../TopicList';

/* eslint-env jest */
describe('Topic list test', () => {
	test('Simple list', () => {
		const student = {
			alias: 'student'
		};

		const instructor = {
			alias: 'instructor'
		};

		const topics = [
			{ title: 'item 1', user: student },
			{ title: 'item 2', user: student },
			{ title: 'item 3', user: instructor }
		];

		const selectedTopics = new Set();

		const onTopicSelect = () => { };

		const topicListCmp = shallow(<TopicList topics={topics} selectedTopics={selectedTopics} onTopicSelect={onTopicSelect}/>);
		expect(topicListCmp.find('.discussion-selection-topic').length).toBe(3);
		const texts = topicListCmp.find('.discussion-selection-topic').map((node) => node.text());

		expect(texts[0]).toMatch(/studentitem 1/);
		expect(texts[1]).toMatch(/studentitem 2/);
		expect(texts[2]).toMatch(/instructoritem 3/);

		topicListCmp.find('.discussion-selection-topic').first().simulate('click');

		setTimeout(function () {
			expect(onTopicSelect).toHaveBeenCalled();
		},500);
	});
});
