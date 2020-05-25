import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Grid, Header, Image, Form, Segment, Button, Icon, Message } from 'semantic-ui-react';
import { email, required } from 'redux-form-validators';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import LogoImg from '../../images/logoAppTitle.png';
import { AUTH_USER } from '../../actions/types';

class SignIn extends Component {
  // When the user submits the form, send the formValues to /api/auth/signin
  onSubmit = async (formValues, dispatch) => {
    try {
      const { data } = await axios.post('/api/auth/signin', formValues);
      localStorage.setItem('token', data.token);
      dispatch({ type: AUTH_USER, payload: data.token });
      this.props.history.push('/dashboard');
    } catch (e) {
      throw new SubmissionError({
        email: 'Wrong email',
        password: 'Wrong password',
        _error: 'Sign In failed',
      });
    }
  }

  // set the token coming from data into localStorage under the key 'token'
  // Dispatch the action to the reducer to set the token as the state for authentication
  // Redirect the user to the '/counter' route
  renderEmail = ({ input, meta }) => {
    // console.log(formProps);
    // console.log(meta);
    return (
      <Form.Input
        {...input}
        fluid
        error={meta.touched && meta.error}
        icon="mail"
        iconPosition="left"
        autoComplete="off"
        placeholder="Email address"
      />
    );
  }

  renderPassword = ({ input, meta }) => {
    return (
      <Form.Input
        {...input}
        type="password"
        fluid
        error={meta.touched && meta.error}
        icon="lock"
        iconPosition="left"
        autoComplete="off"
        placeholder="Password"
      />
    );
  }

  render() {
    const { handleSubmit, invalid, submitting, submitFailed } = this.props;
    return (
      <div>
        <Helmet>
          <style>{'body { background-color: #37373b; }'}</style>
        </Helmet>
        <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 500 }}>
            <Header color="blue" textAlign="center" style={{ fontSize: '36px' }}>
              <Image src={LogoImg} />
              Log-in to your account
            </Header>
            <Form size="large" onSubmit={handleSubmit(this.onSubmit)}>
              <Segment stacked>
                <Field
                  name="email"
                  component={this.renderEmail}
                  validate={
                    [
                      required({ msg: 'Email is required' }),
                      email({ msg: 'You must provide a valid email address' }),
                    ]
                  }
                />
                <Field
                  name="password"
                  component={this.renderPassword}
                  validate={
                    [
                      required({ msg: 'You must provide a password' }),
                    ]
                  }
                />
                <Button
                  content="Sign In"
                  color="blue"
                  fluid
                  size="large"
                  type="submit"
                  disabled={invalid || submitting || submitFailed}
                >
                  <Icon name="sign-in" />
                  Sign In
                </Button>
              </Segment>
            </Form>
            <Message>
              New to the site?
              <Button as={Link} to="/signup" color="blue" size="small" compact style={{ marginLeft: '5px' }}>Sign Up Here</Button>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default reduxForm({ form: 'SignIn ' })(SignIn);
