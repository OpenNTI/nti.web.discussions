import './View.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scoped } from '@nti/lib-locale';
import { Input, Loading, Prompt } from '@nti/web-commons';

import { getPrefix, removePrefix } from './utils';

const { Label, Text } = Input;
const DEFAULT_TEXT = {
	title: 'Create Forum',
	name: 'Forum Name',
	save: 'Create',
	cancel: 'Cancel',
};
const EDIT_TEXT = {
	title: 'Edit Forum',
	save: 'Save',
	cancel: 'Cancel',
};
const t = scoped('nti.web.disscussions.forums.create', DEFAULT_TEXT);
const editScope = scoped('nti.web.disscussions.forums.create.edit', EDIT_TEXT);

const { SaveCancel } = Prompt;

export default class ForumEditor extends Component {
	static propTypes = {
		onBeforeDismiss: PropTypes.func.isRequired,
		onSubmit: PropTypes.func.isRequired,
		error: PropTypes.string,
		loading: PropTypes.bool,
		title: PropTypes.string,
		isEditing: PropTypes.bool,
	};

	static defaultProps = {
		title: '',
	};

	constructor(props) {
		super(props);
		this.state = {
			title: removePrefix(props.title),
			missingFields: !props.title || props.title.trim() === '',
			prefix: getPrefix(props.title),
		};
	}

	onChange = (name, value) => {
		const missingFields = !value || value.trim() === '';

		this.setState({ [name]: value, missingFields });
	};

	onSave = () => {
		const { onSubmit, loading } = this.props;
		if (!loading) {
			const { title, prefix } = this.state;
			onSubmit({ title: prefix ? `${prefix} ${title}` : title });
		}
	};

	render() {
		const { onBeforeDismiss, loading, isEditing } = this.props;
		const { title, missingFields } = this.state;

		return (
			<SaveCancel
				className="forum-editor"
				getString={isEditing ? editScope : t}
				onCancel={onBeforeDismiss}
				onSave={this.onSave}
				disableSave={loading || missingFields}
			>
				<Label className="forum-title-label" label={t('name')}>
					<Text
						className="forum-title"
						value={title}
						onChange={value => this.onChange('title', value)}
						name="title"
						required
					/>
				</Label>
				{loading && <Loading.Mask maskScreen />}
			</SaveCancel>
		);
	}
}
