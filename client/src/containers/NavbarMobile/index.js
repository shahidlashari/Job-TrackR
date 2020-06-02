import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Responsive, Sidebar, Menu, Image, Icon, Button, Dropdown } from 'semantic-ui-react';
import LogoImg from '../../images/logo.png';

const getWidth = () => {
  const isSSR = typeof window === 'undefined';
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class NavbarMobile extends Component {
  state = {
    sidebarOpened: false,
  }

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  getUsername = () => {
    if (this.props.authenticated && this.props.user) {
      const name = `Logged-in as: ${this.props.user.username}`;
      return (
        <Dropdown text={name} style={{ marginRight: '20px', fontSize: '16px' }}>
          <Dropdown.Menu>
            <Dropdown.Item as={NavLink} to="/signout" icon="sign-out" text="Sign Out" />
          </Dropdown.Menu>
        </Dropdown>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <Responsive as={Sidebar.Pushable} getWidth={getWidth} maxWidth={Responsive.onlyMobile.maxWidth}>
        <Sidebar
          as={Menu}
          animation="overlay"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={this.state.sidebarOpened}
        >
          <Menu.Item as={NavLink} to="/home" activeclassname="active" className="navbar-item-home">
            <Icon name="home" />
            Home
          </Menu.Item>
          <Menu.Item as={NavLink} to="/search" activeclassname="active" className="navbar-item-search">
            <Icon name="search" />
            Search
          </Menu.Item>
          <Menu.Item as={NavLink} to="/trending" activeclassname="active" className="navbar-item-trending">
            <Icon name="industry" />
            Trending
          </Menu.Item>
          { this.props.authenticated ? <Menu.Item as={NavLink} to="/chatroom" activeclassname="active" className="navbar-item-chat">
            <Icon name="chat" />
            Chat Room
          </Menu.Item> : null }
          { this.props.authenticated ? <Menu.Item as={NavLink} to="/dashboard" activeclassname="active" className="navbar-item-dashboard">
            <Icon name="cogs" />
            Job Dashboard
          </Menu.Item> : null }
          { this.props.authenticated ? <Menu.Item as={NavLink} to="/dashboard1" activeclassname="active" className="navbar-item-dashboard1">
            <Icon name="cogs" />
            Job Dashboard1
          </Menu.Item> : null }
          <Menu.Item position="right" header>
            { this.props.authenticated && this.props.user ? this.getUsername() : null }
            { this.props.authenticated ? null : <Button as={NavLink} to="/signin" inverted style={{ marginBottom: '10px' }}>
              <Icon name="sign-in" />
              Sign In
            </Button> }
            { this.props.authenticated ? null : <Button as={NavLink} to="/signup" inverted>
              <Icon name="signup" />
              Sign Up
            </Button> }
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={this.state.sidebarOpened} className="sidebar-pusher">
          <Menu
            inverted
            pointing
            size="huge"
            activeclassname="active"
            className="navbar-menu"
          >
            <Menu.Item as={Link} to="/">
              <Image src={LogoImg} width="65" height="60" className="navbar-logo" />
              <h1 className="navbar-title">Job TrackR</h1>
            </Menu.Item>
            <Menu.Item onClick={this.handleToggle}>
              <Icon name="sidebar" />
            </Menu.Item>
          </Menu>
          {this.props.children}
        </Sidebar.Pusher>
      </Responsive>
    );
  }
}

NavbarMobile.propTypes = {
  children: PropTypes.node,
};

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated, user: state.auth.user };
}

export default connect(mapStateToProps, {})(NavbarMobile);
