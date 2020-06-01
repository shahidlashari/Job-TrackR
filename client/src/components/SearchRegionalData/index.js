import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Segment, Message, Button, Icon } from 'semantic-ui-react';
import { required } from 'redux-form-validators';
import axios from 'axios';
import { GET_REGIONAL_DATA, GET_REGIONAL_DATA_ERROR } from '../../actions/types';

class SearchRegionalData extends Component {
  state = {
    loading: false,
    searchError: false,
  }

  // When the user submits the form, send the formValues to /api/trending/employer
  onSubmit = async (formValues, dispatch) => {
    const { statenamer } = formValues;
    try {
      this.setState({ loading: true });
      const { data } = await axios.get(`/api/trending/regional?statenamer=${statenamer}`);
      dispatch({ type: GET_REGIONAL_DATA, payload: data.month, location: data.location.display_name });
      this.setState({ loading: false });
      if (this.props.regional.length === 0) {
        this.setState({ searchError: true });
      } else {
        this.setState({ searchError: false });
      }
      this.scrollToChart();
    } catch (e) {
      dispatch({ type: GET_REGIONAL_DATA_ERROR, payload: e });
    }
  }

  scrollToChart = () => {
    if (!document.querySelector('.employer-chart')) {
      window.scrollTo(0, document.querySelector('.regional-chart').scrollHeight);
    } else {
      const chart = document.querySelector('.regional-chart');
      const offset = 40;
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
          placeholder="Enter state e.g california"
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
              loading={this.state.loading}
              color="twitter"
              size="large"
              type="submit"
              disabled={submitting || submitFailed}
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

export default reduxForm({ form: 'SearchRegionalData ' })(SearchRegionalData);
