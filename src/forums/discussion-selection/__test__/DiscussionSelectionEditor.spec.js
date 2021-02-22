/* eslint-env jest */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { TestUtils } from '@nti/web-client';
import { wait } from '@nti/lib-commons';

import DiscussionSelectionEditor from '../DiscussionSelectionEditor';

describe('Discussion selection editor', () => {
	test('Test skip ahead', async () => {
		const forums = [
			{
				title: 'Forum 1',
				children: [
					{
						title: 'Section 1',
						store: {
							getRange: () => {
								return [
									{
										title: 'Board 1',
										get: prop => {
											return 'Board 1';
										},
										getLink: prop => {
											return 'mockLink';
										},
									},
									{
										title: 'Board 2',
										get: prop => {
											return 'Board 2';
										},
										getLink: prop => {
											return 'mockLink';
										},
									},
								];
							},
						},
					},
				],
			},
			{ title: 'Forum 2' },
		];

		const bundle = {
			getForumList: () => {
				return Promise.resolve(forums);
			},
			getDiscussionAssets: () => {
				return Promise.resolve([]);
			},
		};

		function onDiscussionTopicSelect(topic) {}

		let editor;
		const result = render(
			<DiscussionSelectionEditor
				ref={x => (editor = x)}
				bundle={bundle}
				onDiscussionTopicSelect={onDiscussionTopicSelect}
			/>
		);

		await wait();

		editor.setState({ step: 1, forums });

		await wait();

		// click Forum 1
		fireEvent.click(await result.findByText(/Forum 1/));

		await waitFor(async () => {
			// should have skipped to step 3 since there was only one section in step 2
			expect(editor.state.step).toBe(3);
			await result.findByText(/Board 1/);
			await result.findByText(/Board 2/);
		});
	});

	test('Test editor steps', async () => {
		const topicsResp = {
			Items: [
				{ title: 'item 1', Creator: 'student' },
				{ title: 'item 2', Creator: 'student' },
				{ title: 'item 3', Creator: 'instructor' },
			],
			FilteredTotalItemCount: 3,
		};

		// @nti/lib-interfaces does not have a parallel to this structure...
		const forums = [
			{
				title: 'Forum 1',
				children: [
					{
						title: 'Section 1',
						store: {
							getRange: () => {
								return [
									{
										title: 'Board 1',
										get: prop => 'Board 1',
										fetchLink: prop => topicsResp,
									},
									{
										title: 'Board 2',
										get: prop => 'Board 2',
										fetchLink: prop => topicsResp,
									},
								];
							},
						},
					},
					{
						title: 'Section 2',
						store: {
							getRange: () => [],
						},
					},
				],
			},
			{
				title: 'Forum 2',
				children: [],
			},
		];

		const bundle = {
			//FIXME: We need to implement this structure for @nti/lib-interfaces
			getForumList: async () => forums,
			getDiscussionAssets: async () => [],

			// @nti/lib-interfaces version of bundle has these:
			getDiscussions: async () => [{ Items: [] }],
			getCourseDiscussions: async () => ({ Items: [] }),
		};

		TestUtils.setupTestClient({
			resolveEntity: entity => {
				return Promise.resolve({ alias: entity });
			},
		});

		const onDiscussionTopicSelect = jest.fn();

		let editor;
		const result = render(
			<DiscussionSelectionEditor
				ref={x => (editor = x)}
				bundle={bundle}
				onDiscussionTopicSelect={onDiscussionTopicSelect}
			/>
		);

		editor.setState({ step: 1, forums: forums });

		await wait();

		// verify forum list
		await result.findByText(/Forum 1/);
		await result.findByText(/Forum 2/);

		// click Forum 1 and verify Section listing
		fireEvent.click(await result.findByText(/Forum 1/));

		await wait();

		expect(editor.state.step).toBe(2);
		await result.findByText(/Section 1/);
		await result.findByText(/Section 2/);

		// click Section 1 and verify Board listing
		fireEvent.click(await result.findByText(/Section 1/));

		await wait();

		expect(editor.state.step).toBe(3);
		await result.findByText(/Board 1/);
		await result.findByText(/Board 2/);

		// click Board 1 and verify Topic listing
		fireEvent.click(await result.findByText(/Board 1/));

		await wait();

		expect(editor.state.step).toBe(4);

		fireEvent.click(await result.findByText(/Board 1/));

		await waitFor(() =>
			// verify that the component's provided callback is called
			// when a topic is selected
			expect(onDiscussionTopicSelect).toHaveBeenCalled()
		);
	});
});
