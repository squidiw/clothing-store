import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import { ReactComponent as Logo } from "../../assets/4.3 crown.svg.svg";
import "./header.styles.scss";
import { auth } from "../../firebase/firebase.utils";

const Header = ({ currentUser }) => (
  <div className="header">
    <Link to="/">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>

      <Link className="option" to="/shop">
        CONTACT
      </Link>

      { currentUser ? (
        <div className="option" onClick={() => auth.signOut()}>
          {" "}
          SIGN OUT{" "}
        </div>
      ) : (
        <Link className="option" to="/signin">
          {" "}
          SIGN IN{" "}
        </Link>
      )}
    </div>
  </div>
);

// state HERE IS THE ROOT REDUCER
const mapStateToProps = (state) => ({
  // currentUser IS THE PROP FOR THE HEADER, user IS THE obj prop IN ROOT REDUCER & currentUser IS THE obj prop IN user reducer
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Header);
