import React from 'react';
import { addUser } from '../../api';

class SignInPage extends React.Component {
  state = { username: '', name: '' };
  render() {
    return (
      <div className="ui container segment">
        <h2>Register</h2>
        <form className="ui form">
          <div className="field">
            <label>
              Username
              <input
                name="username"
                type="text"
                placeholder="Username"
                onChange={this.saveInput}
              />
            </label>
          </div>
          <div className="field">
            <label>
              Full Name
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                onChange={this.saveInput}
              />
            </label>
          </div>
          <button className="ui button" onClick={this.register}>
            Register
          </button>
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
