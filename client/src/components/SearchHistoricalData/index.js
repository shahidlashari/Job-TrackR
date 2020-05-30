import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Form, Segment, Button, Icon } from 'semantic-ui-react';
import { required } from 'redux-form-validators';
import axios from 'axios';
import { GET_HISTORICAL_DATA } from '../../actions/types';

class SearchHistoricalData extends Component {
  // When the user submits the form, send the formValues to /api/trending/historical
  onSubmit = async (formValues, dispatch) => {
    const { statenameh, jobcategoryh } = formValues;
    const jobcategory1 = `${jobcategoryh}-jobs`;
    try {
      const { data } = await axios.get(`/api/trending/historical?statenameh=${statenameh}&jobcategoryh=${jobcategory1}`);
      dispatch({ type: GET_HISTORICAL_DATA, payload: data });
    } catch (e) {
      throw new SubmissionError({
        _error: 'Trending Search failed!',
      });
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

  render() {
    const { handleSubmit, submitting, submitFailed } = this.props;
    // console.log(this.props);
    return (
      <div>

        <Form size="large" onSubmit={handleSubmit(this.onSubmit)}>
          <Segment stacked>
            <p> This returns salary and vacancy data for six months for job categories in a state.</p>
            <Field
              name="jobcategoryh"
              placeholder="Enter job vategory e.g IT"
              component={this.renderHistoricalData}
              validate={
                    [
                      required({ msg: 'Job category is required' }),
                    ]
                  }
            />
            <Field
              name="statenameh"
              placeholder="Enter state e.g california"
              component={this.renderHistoricalData}
              validate={
                    [
                      required({ msg: 'State is required' }),
                    ]
                  }
            />
            <Button
              color="teal"
              size="large"
              type="submit"
              disabled={submitting || submitFailed}
            >
              <Icon name="search" />
              Search Historical Data
            </Button>
          </Segment>
        </Form>
      </div>
    );
  }
}
export default reduxForm({ form: 'SearchHistoricalData ' })(SearchHistoricalData);
