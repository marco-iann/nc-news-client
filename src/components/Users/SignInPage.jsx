import React from 'react';
import { addUser } from '../../api';

class SignInPage extends React.Component {
  state = { username: '', name: '' };
  render() {
    return (
      <div className="ui container segment">
        <h2>Register</h2>
        <form className="ui form" onSubmit={this.register}>
          <div className="field">
            <label>
              Username
              <input
                name="username"
                type="text"
                placeholder="Username"
                onChange={this.saveInput}
                required={true}
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
                required={true}
              />
            </label>
          </div>
          <button className="ui button">Register</button>
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
      this.props.logIn(newUser);
    });
  };
}

export default SignInPage;
