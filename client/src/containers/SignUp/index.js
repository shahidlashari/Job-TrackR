import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Grid, Header, Image, Form, Segment, Button, Icon, Message } from 'semantic-ui-react';
import { email, length, required } from 'redux-form-validators';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import LogoImg from '../../images/logoAppTitle.png';
import { AUTH_USER, AUTH_USER_ERROR } from '../../actions/types';

class SignUp extends Component {
  onSubmit = async (formValues, dispatch) => {
    // console.log(formValues);
    // console.log(formsProps);
    try {
      const { data } = await axios.post('/api/auth/signup', formValues);
      console.log(data);
      localStorage.setItem('token', data.token);
      dispatch({ type: AUTH_USER, payload: data.token });
      this.props.history.push('/dashboard');
    } catch (e) {
      dispatch({ type: AUTH_USER_ERROR, payload: e });
    }
  }

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
              Create an account
            </Header>
            <Form size="large" onSubmit={handleSubmit(this.onSubmit)}>
              <Segment stacked>
                <Field
                  name="email"
                  validate={
                    [
                      required({ msg: 'Email is required' }),
                      email({ msg: 'You must provide a valid email address' }),
                    ]
                  }
                  component={this.renderEmail}
                />
                <Field
                  name="password"
                  validate={
                    [
                      required({ msg: 'Password is required' }),
                      length({ min: 6, msg: 'Your password must be at least 6 characters long' }),
                    ]
                  }
                  component={this.renderPassword}
                />
                <Button
                  color="blue"
                  fluid
                  size="large"
                  type="submit"
                  disabled={invalid || submitting || submitFailed}
                >
                  <Icon name="signup" />
                  Sign Up
                </Button>
              </Segment>
            </Form>
            <Message>
              Already have an account?
              <Button as={Link} to="/signin" color="blue" size="small" compact style={{ marginLeft: '5px' }}>Sign In Here</Button>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const asyncValidate = async ({ email }) => {
  try {
    const { data } = await axios.get(`/api/user/emails?email=${email}`);
    // const foundEmail = data.some(user => user.email === email);
    if (data) {
      throw new Error();
    }
  } catch (e) {
    throw { email: 'Email is already taken' };
  }
};

export default reduxForm({
  form: 'SignUp',
  asyncValidate,
  asyncChangeFields: ['email'],
})(SignUp);
