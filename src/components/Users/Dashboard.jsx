import React from 'react';
import avatar from '../../res/avatar.jpg';
import { checkUsername } from '../../api';

class Dashboard extends React.Component {
  state = { user: null };

  componentDidMount() {
    checkUsername(this.props.loggedInUser).then(user =>
      this.setState({ user })
    );
  }

  render() {
    const { user } = this.state;
    if (!user) return <div className="ui container segment">Please log in</div>;
    return user ? (
      <div className="ui container segment">
        <h2>{user.username}'s Dashboard</h2>
        <div className="ui card">
          <div className="image">
            <img src={user.avatar_url || avatar} alt={user.username} />
          </div>
          <div className="content">
            <h4>{user.name}</h4>
          </div>
        </div>
      </div>
    ) : null;
  }
}

export default Dashboard;
