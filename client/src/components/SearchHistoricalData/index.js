import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Segment, Message, Button, Icon } from 'semantic-ui-react';
import { required } from 'redux-form-validators';
import axios from 'axios';
import { GET_HISTORICAL_DATA, GET_HISTORICAL_DATA_ERROR } from '../../actions/types';

class SearchHistoricalData extends Component {
  state = {
    searchError: false,
    messageDismiss: true,
  }

  loading = false;

  // When the user submits the form, send the formValues to /api/trending/historical
  onSubmit = async (formValues, dispatch) => {
    const { statenameh, jobcategoryh } = formValues;
    const jobcategory1 = `${jobcategoryh}-jobs`;
    try {
      this.loading = true;
      const { data } = await axios.get(`/api/trending/historical?statenameh=${statenameh}&jobcategoryh=${jobcategory1}`);
      dispatch({ type: GET_HISTORICAL_DATA, payload: data });
      this.loading = false;
      this.scrollToChart();
      this.setState({ searchError: false, messageDismiss: false });
    } catch (e) {
      this.loading = false;
      this.setState({ searchError: true, messageDismiss: true });
      dispatch({ type: GET_HISTORICAL_DATA_ERROR, payload: e });
    }
  }

  scrollToChart = () => {
    if (!document.querySelector('.employer-chart') && !document.querySelector('.regional-chart')) {
      window.scrollTo(0, document.querySelector('.historical-chart').scrollHeight);
    } else {
      const chart = document.querySelector('.historical-chart');
      const offset = 200;
      const chartPosition = chart.getBoundingClientRect().top;
      const offsetPosition = chartPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  }

  renderHistoricalData = ({ input, meta, placeholder }) => {
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
            <h3 style={{ fontSize: '16px' }}> This returns salary and vacancy data for six months for job categories in any state.</h3>
            <Field
              name="jobcategoryh"
              placeholder="Enter Job Category (e.g. IT)"
              component={this.renderHistoricalData}
              validate={
                    [
                      required({ msg: 'Job category is required' }),
                    ]
                  }
            />
            <Field
              name="statenameh"
              placeholder="Enter State (e.g. New York)"
              component={this.renderHistoricalData}
              validate={
                    [
                      required({ msg: 'State is required' }),
                    ]
                  }
            />
            <Button
              loading={this.loading}
              color="brown"
              size="large"
              type="submit"
              disabled={invalid || submitting || submitFailed}
            >
              <Icon name="search" />
              Search Historical Data
            </Button>
            { this.state.searchError ? this.renderError() : null }
          </Segment>
        </Form>
      </div>
    );
  }
}

export default reduxForm({ form: 'SearchHistoricalData' })(SearchHistoricalData);
