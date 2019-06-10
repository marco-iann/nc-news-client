import React from 'react';
import './Header.css';
import { Link } from '@reach/router';

const Header = ({ user, logOut }) => {
  return (
    <div className="header ui container">
      <h1>Northcoders News</h1>
      {user && <p className="logged-in-user">You are logged in as {user}</p>}
      <div>
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
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a className="link logout" onClick={logOut}>
            Logout
          </a>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Header;
