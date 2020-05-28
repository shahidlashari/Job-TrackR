import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Form, Segment, Button, Header, Grid, Icon } from 'semantic-ui-react';
import { required } from 'redux-form-validators';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { GET_EMPLOYER_DATA } from '../../actions/types';

class SearchEmployerData extends Component {
  // When the user submits the form, send the formValues to /api/trending/employer
  onSubmit = async (formValues, dispatch) => {
    // eslint-disable-next-line no-undef
    const { jobtitle } = formValues;
    // console.log(formValues);
    try {
      const { data } = await axios.get(`/api/trending/employer?jobtitle=${jobtitle}`);
      dispatch({ type: GET_EMPLOYER_DATA, payload: data });
      this.props.history.push('/trending');
    } catch (e) {
      throw new SubmissionError({
        _error: 'Trending Search failed!',
      });
    }
  }

  renderEmployerData = ({ input, meta }) => {
    //    console.log(meta);
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
            <Form size="large" onSubmit={handleSubmit(this.onSubmit)}>
              <Segment stacked>
                <Field
                  name="jobtitle"
                  // placeholder="Job Title e.g project manager"
                  component={this.renderEmployerData}
                  validate={
                    [
                      required({ msg: 'Job category is required' }),
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
                  Search Employer Data
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
export default reduxForm({ form: 'SearchEmployerData ' })(SearchEmployerData);
