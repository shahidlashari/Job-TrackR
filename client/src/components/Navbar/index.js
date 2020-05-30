import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Image, Icon, Button } from 'semantic-ui-react';
import LogoImg from '../../images/logo.png';
import './style.css';

const Navbar = (props) => {
  return (
    <Menu
      fixed="top"
      inverted
      pointing
      stackable
      size="huge"
      activeclassname="active"
      className="navbar-menu"
    >
      <Menu.Item as={Link} to="/" header>
        <Image src={LogoImg} width="65" height="60" className="navbar-logo" />
        <h1 className="navbar-title">Job TrackR</h1>
      </Menu.Item>
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
      { props.authenticated ? <Menu.Item as={NavLink} to="/chatroom" activeclassname="active" className="navbar-item-chat">
        <Icon name="chat" />
        Chat Room
      </Menu.Item> : null }
      { props.authenticated ? <Menu.Item as={NavLink} to="/dashboard" activeclassname="active" className="navbar-item-dashboard">
        <Icon name="cogs" />
        Job Dashboard
      </Menu.Item> : null }
      <Menu.Item position="right">
        {/* <Dropdown text={props.user.username}>
          <Dropdown.Menu>
            <Dropdown.Item as={NavLink} to="/signout" icon="sign-out" text="Sign Out" />
          </Dropdown.Menu>
        </Dropdown> */}
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
