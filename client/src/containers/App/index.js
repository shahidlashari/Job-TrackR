import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import SignUp from '../SignUp';
import SignIn from '../SignIn';
import SignOut from '../SignOut';
import Navbar from '../../components/Navbar';
import Dashboard from '../Dashboard';
import ModalScrollingExample from '../../components/Modals';

class App extends Component {
  render() {
    return (
      <Grid>
        <Grid.Column>
          <Navbar authenticated={this.props.authenticated} />
          <Route exact path="/" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signout" component={SignOut} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Grid.Column>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(App);
