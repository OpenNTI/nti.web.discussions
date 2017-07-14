import React from 'react';
import { mount } from 'enzyme';
import { TestUtils } from 'nti-web-client';

import DiscussionSelectionEditor from '../DiscussionSelectionEditor';

/* eslint-env jest */
describe('Discussion selection editor', () => {
	test('Test skip ahead', (done) => {
		const forums = [
			{ title: 'Forum 1', children:
				[
					{ title: 'Section 1', store: {
						getRange: () => {
							return [
								{ title: 'Board 1',
									get: (prop) => { return 'Board 1'; },
									getLink: (prop) => { return 'mockLink'; } },
								{ title: 'Board 2',
									get: (prop) => { return 'Board 2'; },
									getLink: (prop) => { return 'mockLink'; } }
							];
						}
					}
					}
				]
			}
		];

		const bundle = {
			getForumList: () => {
				return Promise.resolve(forums);
			}
		};

		let editor = mount(<DiscussionSelectionEditor bundle={ bundle }/>);

		editor = editor.update();

		setImmediate( () => {
			// since there is only one forum and one section, the editor
			// should automatically skip ahead to step 3 (board list)
			expect(editor.state().step).toBe(3);
			expect(editor.text()).toMatch(/Board 1/);
			expect(editor.text()).toMatch(/Board 2/);

			done();
		});
	});

	test('Test editor steps', (done) => {
		const forums = [
			{ title: 'Forum 1', children:
				[
					{ title: 'Section 1', store: {
						getRange: () => {
							return [
								{ title: 'Board 1',
									get: (prop) => { return 'Board 1'; },
									getLink: (prop) => { return 'mockLink'; } },
								{ title: 'Board 2',
									get: (prop) => { return 'Board 2'; },
									getLink: (prop) => { return 'mockLink'; } }
							];
						}
					}
					},
					{ title: 'Section 2', store: {
						getRange: () => {
							return [];
						}
					}
					}
				]
			},
			{ title: 'Forum 2', children: [] }
		];

		const bundle = {
			getForumList: () => {
				return Promise.resolve(forums);
			}
		};

		const topicsResp = {
			Items: [
				{ title: 'item 1', Creator: 'student' },
				{ title: 'item 2', Creator: 'student'  },
				{ title: 'item 3', Creator: 'instructor' }
			],
			FilteredTotalItemCount: 3
		};

		TestUtils.setupTestClient({
			getObjectAtURL: () => {
				return Promise.resolve(topicsResp);
			},
			resolveEntity: (entity) => {
				return Promise.resolve({ alias: entity });
			}

		});

		const onDiscussionTopicSelect = (topic) => {};

		let editor = mount(<DiscussionSelectionEditor bundle={ bundle } onDiscussionTopicSelect={ onDiscussionTopicSelect }/>);

		editor.setState({ step: 1, forums: forums });

		// verify forum list
		expect(editor.text()).toMatch(/Forum 1/);
		expect(editor.text()).toMatch(/Forum 2/);

		// click Forum 1 and verify Section listing
		editor.find('.discussion-selection-item').first().simulate('click');
		editor = editor.update();

		expect(editor.state().step).toBe(2);
		expect(editor.text()).toMatch(/Section 1/);
		expect(editor.text()).toMatch(/Section 2/);

		// click Section 1 and verify Board listing
		editor.find('.discussion-selection-item').first().simulate('click');
		editor = editor.update();

		expect(editor.state().step).toBe(3);
		expect(editor.text()).toMatch(/Board 1/);
		expect(editor.text()).toMatch(/Board 2/);

		// click Board 1 and verify Topic listing
		editor.find('.discussion-selection-item').first().simulate('click');
		editor = editor.update();

		setImmediate( () => {
			expect(editor.state().step).toBe(4);
			expect(editor.text()).toMatch(/studentitem 1/);
			expect(editor.text()).toMatch(/studentitem 2/);
			expect(editor.text()).toMatch(/instructoritem 3/);
			expect(editor.text()).toMatch(/Page 1 of 1/);

			editor.find('.discussion-selection-topic').first().simulate('click');

			// verify that the component's provided callback is called
			// when a topic is selected
			setTimeout(function () {
				expect(onDiscussionTopicSelect).toHaveBeenCalled();
			},500);

			done();
		});
	});
});