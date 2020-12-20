/* eslint-env jest */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import TopicList from '../TopicList';

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

		const {container} = render(<TopicList topics={topics} selectedTopics={selectedTopics} onTopicSelect={onTopicSelect}/>);
		expect(container.querySelectorAll('.discussion-selection-topic').length).toBe(3);

		fireEvent.click(container.querySelector('.discussion-selection-topic'));

		await waitFor(() =>
			expect(onTopicSelect).toHaveBeenCalled());
	});
});
