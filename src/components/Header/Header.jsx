import React from 'react';
import './Header.css';
import { Link } from '@reach/router';

const Header = ({ user, logOut }) => {
  return (
    <div>
      <h1>Northcoders News</h1>
      {user && <p>You are logged in as {user}</p>}
      <div className="links">
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
          <button className="logout-button" onClick={logOut}>
            Logout
          </button>
        ) : (
          <Link className="link" to="/login">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
