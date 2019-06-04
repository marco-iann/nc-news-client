import React from 'react';
import { addUser } from '../../api';

class SignInPage extends React.Component {
  state = { username: '', name: '' };
  render() {
    return (
      <div>
        <h3>Register</h3>
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
