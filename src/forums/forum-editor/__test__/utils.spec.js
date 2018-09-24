/* eslint-env jest */

import { removePrefix, getPrefix } from '../utils';

describe('Forum Editor Utils', () => {
	/**
	 * Remove Prefix
	 */
	test('Remove In-Class', () => {
		const title = 'In-Class Annoucments';
		expect(removePrefix(title)).toEqual('Annoucments');
	});

	test('Remove in-class', () => {
		const title = 'in-class Annoucments';
		expect(removePrefix(title)).toEqual('Annoucments');
	});

	test('Remove Open', () => {
		const title = 'Open Annoucments';
		expect(removePrefix(title)).toEqual('Annoucments');
	});

	test('Remove open', () => {
		const title = 'open Annoucments';
		expect(removePrefix(title)).toEqual('Annoucments');
	});

	test('Not fail on empty', () => {
		expect(removePrefix(undefined)).toEqual('');
	});

	test('Remain the Same', () => {
		const title = 'Discussions';
		expect(removePrefix(title)).toEqual(title);
	});

	test('Not remove open when not at the start', () => {
		const title = 'Today: Open Annoucments';
		expect(removePrefix(title)).toEqual(title);
	});

	/**
	 * Get Prefix
	 */
	test('Return Open', () => {
		const title = 'Open Annoucments';
		expect(getPrefix(title)).toEqual('Open');
	});

	test('Return In-Class', () => {
		const title = 'In-Class Annoucments';
		expect(getPrefix(title)).toEqual('In-Class');
	});

	test('Return open', () => {
		const title = 'open Annoucments';
		expect(getPrefix(title)).toEqual('open');
	});

	test('Return in-class', () => {
		const title = 'in-class Annoucments';
		expect(getPrefix(title)).toEqual('in-class');
	});

	test('Return Nothing', () => {
		const title = 'Annoucments';
		expect(getPrefix(title)).toEqual(null);
	});
});
