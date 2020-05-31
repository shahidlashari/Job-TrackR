// eslint-disable-document
import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Image, Segment, Button, Icon } from 'semantic-ui-react';

export default class AvatarSelect extends Component {
	// array of URL strings avatars
	state = {
		avatars: [
			`https://avatars.dicebear.com/api/male/example.svg?options[mood][]=happy`,
			`https://avatars.dicebear.com/api/female/example.svg?options[mood][]=happy`,
			`https://avatars.dicebear.com/api/avataaars/example.svg?skin[top][]=shortHair`,
			``,
			``,
		],
	};
	// Redux Forms Display the field
	// add code to renderSelect Function
	// give user options to choose from-Avatars
	renderSelect = () => {};

	render() {
		return (
			<Segment>
				<Field name='                                                                                                              avatar' component={this.renderSelect} />
			</Segment>
		);
	}
}
