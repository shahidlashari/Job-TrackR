import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Segment } from 'semantic-ui-react';
import { required } from 'redux-form-validators';

class ChatRoomMessageInput extends Component {
  onSubmit = async (formValues, dispatch) => {
    console.log(formValues);
    // console.log(formsProps);
    try {
      console.log(dispatch);
    } catch (e) {
      // dispatch({ type: AUTH_USER_ERROR, payload: e });
    }
  }

  renderInput = ({ input, meta }) => {
    // console.log(formProps);
    // console.log(meta);
    return (
      <Segment inverted>
        <Form.Input
          {...input}
          fluid
          error={meta.touched && meta.error}
          autoComplete="off"
          placeholder="Type a message here"
          action={{
            content: 'Send',
            color: 'blue',
            labelPosition: 'right',
            icon: 'send',
          }}
        />
      </Segment>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <Form onSubmit={handleSubmit(this.onSubmit)}>
          <Field
            name="message"
            validate={[required({ msg: 'Message is required' })]}
            component={this.renderInput}
          />
        </Form>
      </div>
    );
  }
}

export default reduxForm({ form: 'SignIn ' })(ChatRoomMessageInput);
