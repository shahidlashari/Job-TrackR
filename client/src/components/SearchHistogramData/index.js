import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Segment, Message, Button, Icon } from 'semantic-ui-react';
import { required } from 'redux-form-validators';
import axios from 'axios';
import { GET_HISTOGRAM_DATA, GET_HISTOGRAM_DATA_ERROR } from '../../actions/types';

class SearchHistogramData extends Component {
  state = {
    searchError: false,
    messageDismiss: true,
  }

  loading = false;

  // When the user submits the form, send the formValues to /api/trending/histogram
  onSubmit = async (formValues, dispatch) => {
    const { statename, jobtitleh } = formValues;
    try {
      this.loading = true;
      const { data } = await axios.get(`/api/trending/histogram?statename=${statename}&jobtitleh=${jobtitleh}`);
      dispatch({ type: GET_HISTOGRAM_DATA, payload: data });
      this.loading = false;
      this.scrollToChart();
      this.setState({ searchError: false, messageDismiss: false });
    } catch (e) {
      this.loading = false;
      this.setState({ searchError: true, messageDismiss: true });
      dispatch({ type: GET_HISTOGRAM_DATA_ERROR, payload: e });
    }
  }

  scrollToChart = () => {
    if (!document.querySelector('.employer-chart') && !document.querySelector('.regional-chart') && !document.querySelector('.historical-chart')) {
      window.scrollTo(0, document.querySelector('.histogram-chart').scrollHeight);
    } else {
      const chart = document.querySelector('.histogram-chart');
      const offset = 200;
      const chartPosition = chart.getBoundingClientRect().top;
      const offsetPosition = chartPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  }

  renderHistogramData = ({ input, meta, placeholder }) => {
    return (
      <>
        <Form.Input
          {...input}
          size="large"
          error={meta.touched && meta.error}
          icon="search"
          iconPosition="left"
          autoComplete="off"
          placeholder={placeholder}
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
            <h3 style={{ fontSize: '16px' }}> This returns the current distribution of salaries for a job category in any state. </h3>
            <Field
              name="jobtitleh"
              placeholder="Enter Job Category (e.g. Sales)"
              component={this.renderHistogramData}
              validate={
                    [
                      required({ msg: 'Job Category is required' }),
                    ]
                  }
            />
            <Field
              name="statename"
              placeholder="Enter State (e.g. Florida)"
              component={this.renderHistogramData}
              validate={
                    [
                      required({ msg: 'State is required' }),
                    ]
                  }
            />
            <Button
              loading={this.loading}
              color="green"
              size="large"
              type="submit"
              disabled={invalid || submitting || submitFailed}
            >
              <Icon name="search" />
              Search Histogram Data
            </Button>
            { this.state.searchError ? this.renderError() : null }
          </Segment>
        </Form>
      </div>
    );
  }
}

export default reduxForm({ form: 'SearchHistogramData' })(SearchHistogramData);
