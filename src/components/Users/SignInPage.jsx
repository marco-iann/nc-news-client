import React from 'react';
import { addUser } from '../../api';

class SignInPage extends React.Component {
  state = { username: '', name: '' };
  render() {
    return (
      <div className="page-content">
        <h2 className="page-title">Register</h2>
        <form>
          <label>
            Username
            <input
              name="username"
              type="text"
              placeholder="Username"
              onChange={this.saveInput}
            />
          </label>
          <label>
            Full Name
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              onChange={this.saveInput}
            />
          </label>
          <button onClick={this.register}>Register</button>
        </form>
      </div>
    );
  }

  saveInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  register = e => {
    e.preventDefault();
    addUser(this.state).then(newUser => {
      this.props.logIn(newUser.username);
    });
  };
}

export default SignInPage;
