/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';

import TopicList from '../TopicList';

const sleep = x => new Promise(a => setTimeout(a, x));

describe('Topic list test', () => {
	test('Simple list', async () => {
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

		const onTopicSelect = jest.fn();

		const topicListCmp = mount(<TopicList topics={topics} selectedTopics={selectedTopics} onTopicSelect={onTopicSelect}/>);
		expect(topicListCmp.find('.discussion-selection-topic').length).toBe(3);

		topicListCmp.find('.discussion-selection-topic').first().simulate('click');

		await sleep(500);

		expect(onTopicSelect).toHaveBeenCalled();
	});
});
