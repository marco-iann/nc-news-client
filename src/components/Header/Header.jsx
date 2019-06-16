import React from 'react';
import './Header.css';
import { Link } from '@reach/router';

const Header = ({ user, logOut }) => {
  return (
    <div className="ui container title">
      <div className="ui header top-header">
        <img
          className="logo"
          src="https://www.manchesterdigital.com/sites/default/files/learn_to_code_manchester_rw_original_0.png"
          alt="Northcoders"
        />
        <h1>News</h1>
        {user && <p className="logged-in-user">You are logged in as {user}</p>}
      </div>
      <div className="ui header navbar">
        <Link className="link" to="/topics">
          Topics
        </Link>
        <Link className="link" to="/articles">
          Articles
        </Link>
        <Link className="link" to="/dashboard">
          Dashboard
        </Link>
        {user ? (
          <span className="link logout" onClick={logOut}>
            Logout
          </span>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Header;
