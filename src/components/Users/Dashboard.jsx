import React from 'react';
import defaultAvatar from '../../res/avatar.jpg';
import { Link } from '@reach/router';

const Dashboard = props => {
  const { loggedInUser } = props;
  return loggedInUser ? (
    <div className="ui container segment">
      <h2>{loggedInUser.username}'s Dashboard</h2>
      <div className="ui card">
        <div className="image">
          <img
            src={loggedInUser.avatar_url || defaultAvatar}
            alt={loggedInUser.username}
          />
        </div>
        <div className="content">
          <h4>{loggedInUser.name}</h4>
        </div>
      </div>
    </div>
  ) : (
    <div className="ui container segment">
      Please <Link to="/login">log in</Link>
    </div>
  );
};

export default Dashboard;
