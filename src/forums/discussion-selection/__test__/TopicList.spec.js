/* eslint-env jest */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import TopicList from '../TopicList';

describe('Topic list test', () => {
	test('Simple list', async () => {
		const student = {
			alias: 'student',
		};

		const instructor = {
			alias: 'instructor',
		};

		const topics = [
			{ title: 'item 1', user: student },
			{ title: 'item 2', user: student },
			{ title: 'item 3', user: instructor },
		];

		const selectedTopics = new Set();

		const onTopicSelect = jest.fn();

		const results = render(
			<TopicList
				topics={topics}
				selectedTopics={selectedTopics}
				onTopicSelect={onTopicSelect}
			/>
		);
		expect(results.getAllByText(/item \d/).length).toBe(3);

		fireEvent.click(await results.queryByText(/item 1/));

		await waitFor(() => expect(onTopicSelect).toHaveBeenCalled());
	});
});
