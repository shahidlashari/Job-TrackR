import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Icon, FormInput } from 'semantic-ui-react';
import { addList, addCard } from '../../actions/draganddropActions';
import JobForm from '../JobForm';

class JobCreator extends Component {
  state = {
    formOpen: false,
    text: '',
  };

  openForm = () => {
    this.setState({
      formOpen: true,
    });
  };

  closeForm = (e) => {
    this.setState({
      formOpen: false,
    });
  };

  handleInputChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  handleAddList = () => {
    const { dispatch } = this.props;
    const { text } = this.state;

    if (text) {
      this.setState({
        text: '',
      });
      dispatch(addList(text));
    }
  };

  handleAddCard = () => {
    const { dispatch, listID } = this.props;
    const { text } = this.state;

    if (text) {
      this.setState({
        text: '',
      });
      dispatch(addCard(listID, text));
    }
  };

  renderOpenForm = () => {
    const { list } = this.props;

    const buttonText = list ? 'Add another list' : 'Add another card';
    // const buttonTextOpacity = list ? 1 : 0.5;
    // const buttonTextColor = list ? 'white' : 'inherit';
    // const buttonTextBackground = list ? 'rgba(0,0,0,.15)' : 'inherit';

    return (
      <Button onClick={this.openForm}>
        <Icon>Add</Icon>
        <p style={{ flexShrink: 0 }}>{buttonText}</p>
      </Button>
    );
  };

  render() {
    const { text } = this.state;
    const { list } = this.props;
    return this.state.formOpen ? (
      <JobForm
        text={text}
        onChange={this.handleInputChange}
        closeForm={this.closeForm}
      >
        <Button onClick={list ? this.handleAddList : this.handleAddCard}>
          {list ? 'Add List' : 'Add Card'}
        </Button>
      </JobForm>
    ) : (
      <Form list={list} onClick={this.openForm}>
        <FormInput>
          <Button>
            {list ? 'Add another list' : 'Add another card'}
          </Button>
        </FormInput>
      </Form>
    );
  }
}

export default connect()(JobCreator);
