import React from 'react';
import { addUser } from '../../api';
import { navigate } from '@reach/router';

class SignInPage extends React.Component {
  state = { username: '', name: '', err: null };
  render() {
    const { err } = this.state;
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
        {err && <p>Unable to register</p>}
      </div>
    );
  }

  saveInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  register = e => {
    e.preventDefault();
    addUser(this.state)
      .then(newUser => {
        this.props.logIn(newUser);
        navigate('/dashboard');
      })
      .catch(err => this.setState({ err }));
  };
}

export default SignInPage;
