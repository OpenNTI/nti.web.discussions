import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scoped } from '@nti/lib-locale';
import { Panels, DialogButtons, Input, Loading, Prompt } from '@nti/web-commons';

const { Label, Text } = Input;
const DEAFULT_TEXT = {
	header: 'Create Forum',
	editHeader: 'Edit Forum',
	editSubmit: 'Save',
	title: 'Title',
	submit: 'Create',
	cancel: 'Cancel'
};
const t = scoped('nti.web.disscussions.forums.create', DEAFULT_TEXT);
const { Dialog } = Prompt;

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

	onSubmit = () => {
		const { onSubmit, loading } = this.props;
		if (!loading) {
			onSubmit(this.state);
		}
	}

	render () {
		const { onBeforeDismiss, error, loading, isEditing } = this.props;
		const { title } = this.state;

		const buttons = [
			{ label: t('cancel'), onClick: onBeforeDismiss },
			{ label: t(isEditing ? 'editSubmit' : 'submit'), onClick: this.onSubmit, disabled: loading }
		];

		return (
			<Dialog>
				<div className="forum-create-form">
					<Panels.TitleBar title={t(isEditing ? 'editHeader' : 'header')} iconAction={onBeforeDismiss} />
					{error && <div className="error">{error}</div>}
					<Label className="forum-title-label" label={t('title')}>
						<Text
							className="forum-title"
							value={title}
							onChange={(value) => this.onChange('title', value)}
							name="title"
							required
						/>
					</Label>
					<DialogButtons buttons={buttons} />
					{loading && <Loading.Mask maskScreen />}
				</div>
			</Dialog>
		);
	}
}
