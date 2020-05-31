import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Form, Segment, Button, Icon } from 'semantic-ui-react';
import { required } from 'redux-form-validators';
import axios from 'axios';
import { GET_REGIONAL_DATA } from '../../actions/types';

class SearchRegionalData extends Component {
  // When the user submits the form, send the formValues to /api/trending/employer
  onSubmit = async (formValues, dispatch) => {
    const { statenamer } = formValues;
    try {
      const { data } = await axios.get(`/api/trending/regional?statenamer=${statenamer}`);
      dispatch({ type: GET_REGIONAL_DATA, payload: data.month, location: data.location.display_name });
    } catch (e) {
      throw new SubmissionError({
        _error: 'Trending Search failed!',
      });
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

  render() {
    const { handleSubmit, submitting, submitFailed } = this.props;
    return (
      <div>
        <Form size="large" onSubmit={handleSubmit(this.onSubmit)}>
          <Segment stacked>
            <p> This returns the number of jobs advertised in any state.</p>
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
              color="twitter"
              size="large"
              type="submit"
              disabled={submitting || submitFailed}
            >
              <Icon name="search" />
              Search Regional Data
            </Button>
          </Segment>
        </Form>
      </div>
    );
  }
}

export default reduxForm({ form: 'SearchRegionalData ' })(SearchRegionalData);
