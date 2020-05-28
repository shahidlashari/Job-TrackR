import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Form, Segment, Button, Header, Grid, Icon } from 'semantic-ui-react';
import { required } from 'redux-form-validators';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { GET_HISTORICAL_DATA } from '../../actions/types';

class SearchHistoricalData extends Component {
  // When the user submits the form, send the formValues to /api/trending/historical
  onSubmit = async (formValues, dispatch) => {
    const { statenameh, jobcategoryh } = formValues;
    const jobcategory1 = `${jobcategoryh}-jobs`;
    // console.log(jobcategory1);
    try {
      const { data } = await axios.get(`/api/trending/historical?statenameh=${statenameh}&jobcategory1=${jobcategory1}`);
      dispatch({ type: GET_HISTORICAL_DATA, payload: data });
    } catch (e) {
      throw new SubmissionError({
        _error: 'Trending Search failed!',
      });
    }
  }

  renderHistoricalData = ({ input, meta, placeholder }) => {
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
        <Helmet>
          <style>{'body { background-color: #37373b; }'}</style>
        </Helmet>
        <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 500 }}>
            <Header
              as="h1"
              content="Trending"
              inverted
              style={{
                color: 'skyblue',
                fontSize: '52px',
                fontWeight: 'bold',
                marginBottom: 0,
                marginTop: '1.3em',
              }}
            />
            <p> This salary and vacancy data for six months. You can search for specific job titles, categories and locations.</p>
            <Form size="large" onSubmit={handleSubmit(this.onSubmit)}>
              <Segment stacked>
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
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
export default reduxForm({ form: 'SearchHistoricalData ' })(SearchHistoricalData);
