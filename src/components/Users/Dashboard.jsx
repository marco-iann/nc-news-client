import React from 'react';
import defaultAvatar from '../../res/avatar.jpg';

const Dashboard = props => {
  const { loggedInUser } = props;
  if (!loggedInUser)
    return <div className="ui container segment">Please log in</div>;
  return loggedInUser ? (
    <div className="ui container segment">
      <h2>{loggedInUser.username}'s Dashboard</h2>
      <div className="ui card">
        <div className="image">
          <img
            src={loggedInUser.avata_url || defaultAvatar}
            alt={loggedInUser.username}
          />
        </div>
        <div className="content">
          <h4>{loggedInUser.username}</h4>
        </div>
      </div>
    </div>
  ) : null;
};

export default Dashboard;
