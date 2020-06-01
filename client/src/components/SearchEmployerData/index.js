import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Segment, Message, Button, Icon } from 'semantic-ui-react';
import { required } from 'redux-form-validators';
import axios from 'axios';
import { GET_EMPLOYER_DATA, GET_EMPLOYER_DATA_ERROR } from '../../actions/types';

class SearchEmployerData extends Component {
  state = {
    loading: false,
    searchError: false,
  }

  // When the user submits the form, send the formValues to /api/trending/employer
  onSubmit = async (formValues, dispatch) => {
    const { jobtitle } = formValues;
    try {
      this.setState({ loading: true });
      const { data } = await axios.get(`/api/trending/employer?jobtitle=${jobtitle}`);
      dispatch({ type: GET_EMPLOYER_DATA, payload: data });
      this.setState({ loading: false });
      if (this.props.employer.length === 0) {
        this.setState({ searchError: true });
      } else {
        this.setState({ searchError: false });
      }
      window.scrollTo(0, document.querySelector('.employer-chart').scrollHeight);
    } catch (e) {
      dispatch({ type: GET_EMPLOYER_DATA_ERROR, payload: e });
    }
  }

  renderEmployerData = ({ input, meta }) => {
    return (
      <>
        <Form.Input
          {...input}
          size="large"
          error={meta.touched && meta.error}
          icon="search"
          iconPosition="left"
          autoComplete="off"
          placeholder="Enter Job Title e.g project manager"
        />
      </>
    );
  }

  renderError = () => {
    if (this.state.searchError) {
      return (
        <Message
          size="small"
          icon="x"
          negative
          onDismiss={this.handleDismiss}
          header="Failed to find result!"
          content="Please try again by searching something different"
        />
      );
    } else {
      return null;
    }
  }

  render() {
    const { handleSubmit, submitting, submitFailed } = this.props;
    return (
      <div>
        <Form size="large" onSubmit={handleSubmit(this.onSubmit)}>
          <Segment stacked>
            <h3 style={{ fontSize: '16px' }}> This returns top five employers by number of vacancies for job titles. </h3>
            <Field
              name="jobtitle"
              component={this.renderEmployerData}
              validate={
                    [
                      required({ msg: 'Job category is required' }),
                    ]
                  }
            />
            <Button
              loading={this.state.loading}
              color="purple"
              size="large"
              type="submit"
              disabled={submitting || submitFailed}
            >
              <Icon name="search" />
              Search Employer Data
            </Button>
            { this.state.searchError ? this.renderError() : null }
          </Segment>
        </Form>
      </div>
    );
  }
}

export default reduxForm({ form: 'SearchEmployerData ' })(SearchEmployerData);
