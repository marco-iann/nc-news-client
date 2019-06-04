import React from 'react';
import { checkUsername } from '../../api';

class LoginPage extends React.Component {
  state = { userInput: '' };

  render() {
    return (
      <div>
        <h3>Login</h3>
        <form>
          <label>
            Username
            <input
              type="text"
              placeholder="Username"
              onChange={this.saveUserInput}
              value={this.state.userInput}
            />
          </label>
          <button onClick={this.logInUser}>Login</button>
        </form>
      </div>
    );
  }

  saveUserInput = e => {
    this.setState({ userInput: e.target.value });
  };

  logInUser = e => {
    e.preventDefault();
    checkUsername(this.state.userInput).then(userToLogIn => {
      this.props.logIn(userToLogIn);
      this.setState({ userInput: '' });
    });
  };
}

export default LoginPage;
