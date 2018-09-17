import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scoped } from '@nti/lib-locale';
import { Input, Loading, Prompt } from '@nti/web-commons';

const { Label, Text } = Input;
const DEAFULT_TEXT = {
	title: 'Create Forum',
	save: 'Create',
	cancel: 'Cancel'
};
const EDIT_TEXT = {
	title: 'Edit Forum',
	save: 'Save',
	cancel: 'Cancel'
};
const t = scoped('nti.web.disscussions.forums.create', DEAFULT_TEXT);
const editScope = scoped('nti.web.disscussions.forums.create', EDIT_TEXT);

const { SaveCancel } = Prompt;

export default class ForumEditor extends Component {
	static propTypes = {
		onBeforeDismiss: PropTypes.func,
		onSubmit: PropTypes.func.isRequired,
		error: PropTypes.string,
		loading: PropTypes.bool,
		title: PropTypes.string,
		isEditing: PropTypes.bool
	}

	static defaultProps = {
		title: ''
	}

	constructor (props) {
		super(props);
		this.state = {
			title: props.title
		};
	}

	onChange = (name, value) => {
		this.setState({ [name]: value });
	}

	onSave = () => {
		const { onSubmit, loading } = this.props;
		if (!loading) {
			onSubmit(this.state);
		}
	}

	render () {
		const { onBeforeDismiss, loading, isEditing } = this.props;
		const { title } = this.state;

		return (
			<SaveCancel
				className="forum-editor"
				getString={isEditing ? editScope : t}
				onCancel={onBeforeDismiss}
				onSave={this.onSave}
				disableSave={loading}
			>
				<Label className="forum-title-label" label={t('title')}>
					<Text
						className="forum-title"
						value={title}
						onChange={(value) => this.onChange('title', value)}
						name="title"
						required
					/>
				</Label>
				{loading && <Loading.Mask maskScreen />}
			</SaveCancel>
		);
	}
}
