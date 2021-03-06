import React from 'react';
import './UserPages.css';
import { Link, navigate } from '@reach/router';
import { checkUsername } from '../../api';

class LoginPage extends React.Component {
  state = { userInput: '', err: null };

  render() {
    const { err } = this.state;
    return (
      <div className="ui container segment">
        <h2>Login</h2>
        <form className="ui form" onSubmit={this.logInUser}>
          <div className="field">
            <label>
              Username
              <input
                type="text"
                placeholder="Username"
                onChange={this.saveUserInput}
                value={this.state.userInput}
                required={true}
              />
            </label>
            {err && (
              <p className="login-error-message">Username does not exist</p>
            )}
            <p>
              Need an account? <Link to="/signup">Sign Up</Link> or login as
              "jessjelly"
            </p>
          </div>
          <button className="ui button">Login</button>
        </form>
      </div>
    );
  }

  saveUserInput = e => {
    this.setState({ userInput: e.target.value });
  };

  logInUser = e => {
    e.preventDefault();
    checkUsername(this.state.userInput)
      .then(userToLogIn => {
        this.props.logIn(userToLogIn);
        this.setState({ userInput: '' });
        navigate('/dashboard');
      })
      .catch(err => this.setState({ userInput: '', err }));
  };
}

export default LoginPage;
