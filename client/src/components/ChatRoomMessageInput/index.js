import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Form, Segment } from 'semantic-ui-react';
import { required } from 'redux-form-validators';
import { createMessage } from '../../actions/chatActions';
import { GET_MESSAGES, GET_MESSAGES_ERROR } from '../../actions/types';

class ChatRoomMessageInput extends Component {
  onSubmit = async (formValues, dispatch) => {
    try {
      const message = {
        text: formValues.message,
        userId: this.props.user._id,
        username: this.props.user.username,
      };

      this.props.socket.emit('createMessage', message, () => {
        // console.log(newMessage);
        this.props.socket.emit('loadRoom', null, (roomData) => {
          // console.log(roomData);
          dispatch({ type: GET_MESSAGES, payload: roomData.messages });
          // console.log('Room refreshed');
        });
      });

      this.props.resetForm();
    } catch (e) {
      dispatch({ type: GET_MESSAGES_ERROR, payload: e });
    }
  }

  renderInput = ({ input }) => {
    return (
      <Segment inverted>
        <Form.Input
          {...input}
          fluid
          size="large"
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

  handlePressEnter(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
      this.onSubmit(e);
    }
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

export default compose(
  connect(null, { createMessage }),
  reduxForm({ form: 'messageInput' }),
)(ChatRoomMessageInput);
