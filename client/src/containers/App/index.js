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
import Dashboard1 from '../Dashbord1';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import SignOut from '../SignOut';
import Footer from '../../components/Footer';
import JobBoard from '../JobBoard';
import JobBoardHome from '../JobBoardHome';


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
        <Route exact path="/dashboard1" component={Dashboard1} />
        <Route exact path="/dashboard/:boardId" component={JobBoard} />
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
