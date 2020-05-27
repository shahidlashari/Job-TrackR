import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Image, Segment, Button, Icon } from 'semantic-ui-react';

export default class AvatarSelect extends Component {
// array of URL strings avatars  
    state={
        avatars:[]
    }
// Redux Forms Display the field 
// add code to renderSelect Function
// give user options to choose from-Avatars
    renderSelect =() =>{

    }
    render() {
        return (
           <Segment>
               <Field
                    name="avatar"
                    component={this.renderSelect}

               />
           </Segment>
        )
    }
}
