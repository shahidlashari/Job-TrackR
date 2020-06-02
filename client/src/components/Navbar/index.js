import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavbarDesktop from '../../containers/NavbarDesktop';
import NavbarMobile from '../../containers/NavbarMobile';
import './style.css';

const Navbar = () => {
  const NavbarResponsive = ({ children }) => {
    return (
      <div>
        <NavbarDesktop>{children}</NavbarDesktop>
        <NavbarMobile>{children}</NavbarMobile>
      </div>
    );
  };

  NavbarResponsive.propTypes = {
    children: PropTypes.node,
  };

  return (
    <NavbarResponsive />
  );
};

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated, user: state.auth.user };
}

export default connect(mapStateToProps, {})(Navbar);
