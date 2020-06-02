import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import ScrollToTop from '../../components/ScrollToTop';
import Navbar from '../../components/Navbar';
import Home from '../Home';
import Search from '../Search';
import Trending from '../Trending';
import ChatRoom from '../ChatRoom';
import Dashboard from '../Dashboard';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import SignOut from '../SignOut';
import Footer from '../../components/Footer';


class App extends Component {
  render() {
    return (
      <Router>
        <ScrollToTop />
        <Navbar authenticated={this.props.authenticated} />
        <Route exact path="/" component={Home} authenticated={this.props.authenticated} />
        <Route exact path="/home" component={Home} authenticated={this.props.authenticated} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/trending" component={Trending} />
        <Route exact path="/chatroom" component={ChatRoom} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signout" component={SignOut} />
        <Footer />
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(App);
