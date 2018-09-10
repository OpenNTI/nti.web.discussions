import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scoped } from '@nti/lib-locale';
import { Panels, DialogButtons, Input, Loading, Prompt } from '@nti/web-commons';

const { Label, Text } = Input;
const DEAFULT_TEXT = {
	header: 'Create Forum',
	title: 'Title',
	submit: 'Create',
	cancel: 'Cancel'
};
const t = scoped('nti.web.disscussions.forums.create', DEAFULT_TEXT);
const { Dialog } = Prompt;

export default class ForumCreate extends Component {
	static propTypes = {
		onBeforeDismiss: PropTypes.func,
		onSubmit: PropTypes.func.isRequired,
		error: PropTypes.string,
		loading: PropTypes.bool
	}

	state = {
		title: '',
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
		const { onBeforeDismiss, error, loading } = this.props;
		const { title } = this.state;

		const buttons = [
			{ label: t('cancel'), onClick: onBeforeDismiss },
			{ label: t('submit'), onClick: this.onSubmit, disabled: loading }
		];

		return (
			<Dialog>
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
					{loading && <Loading.Mask maskScreen />}
				</div>
			</Dialog>
		);
	}
}
