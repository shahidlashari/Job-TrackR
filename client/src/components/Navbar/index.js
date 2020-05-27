import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Image, Icon, Button } from 'semantic-ui-react';
import LogoImg from '../../images/logo.png';
import { connect } from "react-redux";
import './style.css';

// export default (props) => (
//   <Menu widths={4}>
//     { props.authenticated ? null : <Menu.Item as={Link} to="/" content="Sign Up" /> }
//     { props.authenticated ? <Menu.Item as={Link} to="/signout" content="Sign Out" /> : <Menu.Item as={Link} to="/signin" content="Sign In" />}
//     { props.authenticated ? <Menu.Item as={Link} to="/dashboard" content="Job Dashboard" /> : <Menu.Item as={Link} to="/" content="Dashboard" /> }
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
      className="navbar-menu"
    >
      <Menu.Item as={Link} to="/" header>
        <Image src={LogoImg} width="65" height="60" className="navbar-logo" />
        <h1 className="navbar-title">Job TrackR</h1>
      </Menu.Item>
      <Menu.Item as={Link} to="/home" className="navbar-item-home">
        <Icon name="home" />
        Home
      </Menu.Item>
      <Menu.Item as={Link} to="/chatroom" className="navbar-item-chat">
        <Icon name="chat" />
        Chat Room
      </Menu.Item>
      {/* <Menu.Item as={Link} to="/trending" className="navbar-item-trending">
        <Icon name="chart bar" />
        Trending
      </Menu.Item> */}
      <Menu.Item as={Link} to="/search" className="navbar-item-search">
        <Icon name="search" />
        Search
      </Menu.Item>
      { props.authenticated ? <Menu.Item as={Link} to="/dashboard" className="navbar-item-dashboard">
        <Icon name="cogs" />
        Job Dashboard
      </Menu.Item> : null }
      <Menu.Item position="right">
        { props.authenticated ? <Button as={Link} to="/signout" inverted>
          <Icon name="sign-out" />
          Sign Out
        </Button> : <Button as={Link} to="/signin" inverted>
          <Icon name="sign-in" />
          Sign In
        </Button>}
        { props.authenticated ? null : <Button as={Link} to="/signup" inverted style={{ marginLeft: '0.5em' }}>
          <Icon name="signup" />
          Sign Up
        </Button> }
      </Menu.Item>
    </Menu>
  );
};
function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated }
}

export default connect(mapStateToProps, {})(Navbar);

