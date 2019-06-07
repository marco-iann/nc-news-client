import React from 'react';
import { Link } from '@reach/router';
import { checkUsername } from '../../api';

class LoginPage extends React.Component {
  state = { userInput: '', err: null };

  render() {
    const { err } = this.state;
    return (
      <div className="page-content">
        <h2 className="page-title">Login</h2>
        <form onSubmit={this.logInUser}>
          <div>
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
          </div>
          <button className="ui-button">Login</button>
        </form>
        {err && <p>Username does not exist</p>}
        <p>
          Not yet registered? <Link to="/signin">Sign In</Link>
        </p>
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
        this.props.logIn(userToLogIn.username);
        this.setState({ userInput: '' });
      })
      .catch(err => this.setState({ userInput: '', err }));
  };
}

export default LoginPage;
