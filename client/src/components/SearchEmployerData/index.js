import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Form, Segment, Button, Icon } from 'semantic-ui-react';
import { required } from 'redux-form-validators';
import axios from 'axios';
import { GET_EMPLOYER_DATA } from '../../actions/types';

class SearchEmployerData extends Component {
  // When the user submits the form, send the formValues to /api/trending/employer
  onSubmit = async (formValues, dispatch) => {
    const { jobtitle } = formValues;
    try {
      const { data } = await axios.get(`/api/trending/employer?jobtitle=${jobtitle}`);
      dispatch({ type: GET_EMPLOYER_DATA, payload: data });
    } catch (e) {
      throw new SubmissionError({
        _error: 'Trending Search failed!',
      });
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
          placeholder=" Enter Job Title e.g project manager "
        />
      </>
    );
  }

  render() {
    const { handleSubmit, submitting, submitFailed } = this.props;
    return (
      <div>
        <Form size="large" onSubmit={handleSubmit(this.onSubmit)}>
          <Segment stacked>
            <p> This returns top five employers by number of vacancies for job titles. </p>
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
              color="purple"
              size="large"
              type="submit"
              disabled={submitting || submitFailed}
            >
              <Icon name="search" />
              Search Employer Data
            </Button>
          </Segment>
        </Form>

      </div>
    );
  }
}

export default reduxForm({ form: 'SearchEmployerData ' })(SearchEmployerData);
