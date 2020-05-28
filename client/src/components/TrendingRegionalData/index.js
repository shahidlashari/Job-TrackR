import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Form, Segment, Button, Header, Grid, Icon } from 'semantic-ui-react';
import { required } from 'redux-form-validators';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { GET_REGIONAL_DATA } from '../../actions/types';

class SearchRegionalData extends Component {
  // When the user submits the form, send the formValues to /api/trending/employer
  onSubmit = async (formValues, dispatch) => {
    const { statenamer } = formValues;
    // const stateName = statenamer.replace(' ', '%20');
    console.log(statenamer);
    try {
      const { data } = await axios.get(`/api/trending/regional?statenamer=${statenamer}`);
      dispatch({ type: GET_REGIONAL_DATA, payload: data });
      this.props.history.push('/search');
    } catch (e) {
      throw new SubmissionError({
        _error: 'Trending Search failed!',
      });
    }
  }

  renderRegionalData = ({ input, meta, placeholder }) => {
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
          // placeholder={placeholder}
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
            <p> This returns the number of jobs advertised in the sub-regions of any location.</p>
            <Form size="large" onSubmit={handleSubmit(this.onSubmit)}>
              <Segment stacked>
                {/* <Field
                  name="citynamer"
                  placeholder="Enter city name e.g San Francisco"
                  component={this.renderRegionalData}
                  validate={
                    [
                      required({ msg: 'City name is required' }),
                    ]
                  }
                /> */}
                <Field
                  name="statenamer"
                  placeholder="Enter state e.g california"
                  component={this.renderRegionalData}
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
                  Search Regional Data
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
export default reduxForm({ form: 'SearchRegionalData ' })(SearchRegionalData);
