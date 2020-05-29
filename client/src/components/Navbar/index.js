import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Image, Icon, Button } from 'semantic-ui-react';
import LogoImg from '../../images/logo.png';
import './style.css';

// export default (props) => (
//   <Menu widths={4}>
//     { props.authenticated ? null : <Menu.Item as={NavLink} to="/" content="Sign Up" /> }
//     { props.authenticated ? <Menu.Item as={NavLink} to="/signout" content="Sign Out" /> : <Menu.Item as={NavLink} to="/signin" content="Sign In" />}
//     { props.authenticated ? <Menu.Item as={NavLink} to="/dashboard" content="Job Dashboard" /> : <Menu.Item as={NavLink} to="/" content="Dashboard" /> }
//   </Menu>
// );
const Navbar = (props) => {
  return (
    <Menu
      fixed="top"
      inverted
      pointing
      stackable
      size="huge"
      activeClassName="active"
      className="navbar-menu"
    >
      <Menu.Item as={Link} to="/" header>
        <Image src={LogoImg} width="65" height="60" className="navbar-logo" />
        <h1 className="navbar-title">Job TrackR</h1>
      </Menu.Item>
      <Menu.Item as={NavLink} to="/home" activeClassName="active"className="navbar-item-home">
        <Icon name="home" />
        Home
      </Menu.Item>
      <Menu.Item as={NavLink} to="/chatroom"activeClassName="active" className="navbar-item-chat">
        <Icon name="chat" />
        Chat Room
      </Menu.Item>
      {/* <Menu.Item as={NavLink} to="/trending" className="navbar-item-trending">
        <Icon name="chart bar" />
        Trending
      </Menu.Item> */}
      <Menu.Item as={NavLink} to="/search" activeClassName="active"className="navbar-item-search">
        <Icon name="search" />
        Search
      </Menu.Item>
      { props.authenticated ? <Menu.Item as={NavLink} to="/dashboard" className="navbar-item-dashboard">
        <Icon name="cogs" />
        Job Dashboard
      </Menu.Item> : null }
      <Menu.Item position="right">
        { props.authenticated ? <Button as={NavLink} to="/signout" inverted>
          <Icon name="sign-out" />
          Sign Out
        </Button> : <Button as={NavLink} to="/signin" inverted>
          <Icon name="sign-in" />
          Sign In
        </Button>}
        { props.authenticated ? null : <Button as={NavLink} to="/signup" inverted style={{ marginLeft: '0.5em' }}>
          <Icon name="signup" />
          Sign Up
        </Button> }
      </Menu.Item>
    </Menu>
  );
};

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps, {})(Navbar);
