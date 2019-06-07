import React from 'react';
import { navigate } from '@reach/router';
import { checkUsername } from '../../api';

class Dashboard extends React.Component {
  state = { user: [] };

  componentDidMount() {
    checkUsername(this.props.loggedInUser).then(user =>
      this.setState({ user })
    );
  }

  render() {
    const { user } = this.state;
    if (!user) navigate('login');
    return user ? (
      <div className="page-content">
        <h2>{user.username}'s Dashboard</h2>
        <img src={user.avatar_url} alt={user.username} />
        <h4>{user.name}</h4>
      </div>
    ) : null;
  }
}

export default Dashboard;
