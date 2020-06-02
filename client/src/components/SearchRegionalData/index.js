import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Segment, Message, Button, Icon } from 'semantic-ui-react';
import { required } from 'redux-form-validators';
import axios from 'axios';
import { GET_REGIONAL_DATA, GET_REGIONAL_DATA_ERROR } from '../../actions/types';

class SearchRegionalData extends Component {
  state = {
    searchError: false,
    messageDismiss: true,
  }

  loading = false;

  // When the user submits the form, send the formValues to /api/trending/employer
  onSubmit = async (formValues, dispatch) => {
    const { statenamer } = formValues;
    try {
      this.loading = true;
      const { data } = await axios.get(`/api/trending/regional?statenamer=${statenamer}`);
      dispatch({ type: GET_REGIONAL_DATA, payload: data.month, location: data.location.display_name });
      this.loading = false;
      this.scrollToChart();
      this.setState({ searchError: false, messageDismiss: false });
    } catch (e) {
      this.loading = false;
      this.setState({ searchError: true, messageDismiss: true });
      dispatch({ type: GET_REGIONAL_DATA_ERROR, payload: e });
    }
  }

  scrollToChart = () => {
    if (!document.querySelector('.employer-chart')) {
      window.scrollTo(0, document.querySelector('.regional-chart').scrollHeight);
    } else {
      const chart = document.querySelector('.regional-chart');
      const offset = 100;
      const chartPosition = chart.getBoundingClientRect().top;
      const offsetPosition = chartPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  }

  renderRegionalData = ({ input, meta }) => {
    return (
      <>
        <Form.Input
          {...input}
          size="large"
          error={meta.touched && meta.error}
          icon="search"
          iconPosition="left"
          autoComplete="off"
          placeholder="Enter State (e.g. New York)"
        />
      </>
    );
  }

  handleDismiss = () => { this.setState({ messageDismiss: false }); }

  renderError = () => {
    if (this.state.messageDismiss && this.state.searchError) {
      return (
        <Message
          size="small"
          icon="x"
          negative
          onDismiss={this.handleDismiss}
          header="Failed to find result!"
          content="Please try again by searching something different"
          style={{ textAlign: 'left' }}
        />
      );
    } else {
      return null;
    }
  }

  render() {
    const { handleSubmit, invalid, submitting, submitFailed } = this.props;
    return (
      <div>
        <Form size="large" onSubmit={handleSubmit(this.onSubmit)}>
          <Segment stacked>
            <h3 style={{ fontSize: '16px' }}> This returns the number of jobs advertised in any state.</h3>
            <Field
              name="statenamer"
              component={this.renderRegionalData}
              validate={
                    [
                      required({ msg: 'State is required' }),
                    ]
                  }
            />
            <Button
              loading={this.loading}
              color="twitter"
              size="large"
              type="submit"
              disabled={invalid || submitting || submitFailed}
            >
              <Icon name="search" />
              Search Regional Data
            </Button>
            { this.state.searchError ? this.renderError() : null }
          </Segment>
        </Form>
      </div>
    );
  }
}

export default reduxForm({ form: 'SearchRegionalData' })(SearchRegionalData);
