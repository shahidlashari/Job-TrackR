import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

export default (props) => (
  <Menu widths={4}>
    { props.authenticated ? null : <Menu.Item as={Link} to="/" content="Sign Up" /> }
    { props.authenticated ? <Menu.Item as={Link} to="/signout" content="Sign Out" /> : <Menu.Item as={Link} to="/signin" content="Sign In" />}
    { props.authenticated ? <Menu.Item as={Link} to="/dashboard" content="Job Dashboard" /> : <Menu.Item as={Link} to="/" content="Dashboard" /> }
  </Menu>
);
