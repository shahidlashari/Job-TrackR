import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Form, Segment, Button, Icon } from 'semantic-ui-react';
import { required } from 'redux-form-validators';
import axios from 'axios';
import { GET_HISTOGRAM_DATA } from '../../actions/types';

class SearchHistogramData extends Component {
  // When the user submits the form, send the formValues to /api/trending/histogram
  onSubmit = async (formValues, dispatch) => {
    const { statename, jobtitleh } = formValues;
    console.log(formValues);
    try {
      const { data } = await axios.get(`/api/trending/histogram?statename=${statename}&jobtitleh=${jobtitleh}`);
      console.log(data);
      dispatch({ type: GET_HISTOGRAM_DATA, payload: data });
      // this.props.history.push('/search');
    } catch (e) {
      throw new SubmissionError({
        _error: 'Trending Search failed!',
      });
    }
  }

  renderHistogramData = ({ input, meta, placeholder }) => {
    // console.log(meta);
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

  render() {
    const { handleSubmit, submitting, submitFailed } = this.props;
    // console.log(this.props);
    return (
      <div>
        <Form size="large" onSubmit={handleSubmit(this.onSubmit)}>
          <Segment stacked>
            <p> This returns the current distribution of salaries for a job category in any state. </p>
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
              color="green"
              size="large"
              type="submit"
              disabled={submitting || submitFailed}
            >
              <Icon name="search" />
              Search Histogram Data
            </Button>
          </Segment>
        </Form>
      </div>
    );
  }
}
export default reduxForm({ form: 'SearchHistogramData ' })(SearchHistogramData);
