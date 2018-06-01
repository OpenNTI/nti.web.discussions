import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scoped } from '@nti/lib-locale';
import { Panels, DialogButtons, Input } from '@nti/web-commons';

const { Label, Text } = Input;
const DEAFULT_TEXT = {
	header: 'Create Forum',
	title: 'Title',
	submit: 'Create',
	cancel: 'Cancel'
};
const t = scoped('nti.web.disscussions.forums.create', DEAFULT_TEXT);

export default
class ForumCreate extends Component {
	static propTypes = {
		onBeforeDismiss: PropTypes.func,
		onSubmit: PropTypes.func.isRequired,
		error: PropTypes.string
	}

	state = {
		title: '',
	}

	onChange = (name, value) => {
		this.setState({ [name]: value });
	}

	onSubmit = () => {
		const { onSubmit } = this.props;
		onSubmit(this.state);
	}

	render () {
		const { onBeforeDismiss, error } = this.props;
		const { title } = this.state;

		const buttons = [
			{ label: t('cancel'), onClick: onBeforeDismiss },
			{ label: t('submit'), onClick: this.onSubmit }
		];

		return (
			<div className="forum-create-form">
				<Panels.TitleBar title={t('header')} iconAction={onBeforeDismiss} />
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
			</div>
		);
	}
}
