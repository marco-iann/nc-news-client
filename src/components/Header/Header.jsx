import React from 'react';
import './Header.css';
import { Link } from '@reach/router';

const Header = () => {
  return (
    <div>
      <h1>Header</h1>
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
        <Link className="link" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Header;
