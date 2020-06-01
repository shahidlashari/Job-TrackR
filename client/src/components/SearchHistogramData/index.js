import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Segment, Message, Button, Icon } from 'semantic-ui-react';
import { required } from 'redux-form-validators';
import axios from 'axios';
import { GET_HISTOGRAM_DATA, GET_HISTOGRAM_DATA_ERROR } from '../../actions/types';

class SearchHistogramData extends Component {
  state = {
    loading: false,
    searchError: false,
  }

  // When the user submits the form, send the formValues to /api/trending/histogram
  onSubmit = async (formValues, dispatch) => {
    const { statename, jobtitleh } = formValues;
    try {
      this.setState({ loading: true });
      const { data } = await axios.get(`/api/trending/histogram?statename=${statename}&jobtitleh=${jobtitleh}`);
      dispatch({ type: GET_HISTOGRAM_DATA, payload: data });
      this.setState({ loading: false });
      if (Object.keys(this.props.histogram).length === 0) {
        this.setState({ searchError: true });
      } else {
        this.setState({ searchError: false });
      }
      this.scrollToChart();
    } catch (e) {
      dispatch({ type: GET_HISTOGRAM_DATA_ERROR, payload: e });
    }
  }

  scrollToChart = () => {
    if (!document.querySelector('.employer-chart') && !document.querySelector('.historical-chart')) {
      window.scrollTo(0, document.querySelector('.histogram-chart').scrollHeight);
    } else {
      const chart = document.querySelector('.histogram-chart');
      const offset = 40;
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
            <h3 style={{ fontSize: '16px' }}> This returns the current distribution of salaries for a job category in any state. </h3>
            <Field
              name="jobtitleh"
              placeholder="Enter Job Category e.g project manager"
              component={this.renderHistogramData}
              validate={
                    [
                      required({ msg: 'Job Category is required' }),
                    ]
                  }
            />
            <Field
              name="statename"
              placeholder="Enter state e.g california"
              component={this.renderHistogramData}
              validate={
                    [
                      required({ msg: 'State is required' }),
                    ]
                  }
            />
            <Button
              loading={this.state.loading}
              color="green"
              size="large"
              type="submit"
              disabled={submitting || submitFailed}
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
export default reduxForm({ form: 'SearchHistogramData ' })(SearchHistogramData);
