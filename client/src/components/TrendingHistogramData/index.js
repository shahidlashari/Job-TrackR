import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Form, Segment, Button, Header, Grid, Icon } from 'semantic-ui-react';
import { required } from 'redux-form-validators';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { GET_HISTOGRAM_DATA } from '../../actions/types';

class SearchHistogramData extends Component {
  // When the user submits the form, send the formValues to /api/trending/employer
  onSubmit = async (formValues, dispatch) => {
    const { statename, jobtitleh } = formValues;
    console.log(formValues);
    try {
      const { data } = await axios.get(`/api/trending/histogram?statename=${statename}&jobtitle=${jobtitleh}`);
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
            <p> Search returns the current distribution of salaries for specific job category in any state. Each salary number indicates the lower end of a range. The number of vacanices with a salary in that range is indicated by the vacancies number. </p>
            <Form size="large" onSubmit={handleSubmit(this.onSubmit)}>
              <Segment stacked>
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
                <Button
                  color="teal"
                  size="large"
                  type="submit"
                  disabled={submitting || submitFailed}
                >
                  <Icon name="history" />
                  Search Histogram Data
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
export default reduxForm({ form: 'SearchHistogramData ' })(SearchHistogramData);
