import React from 'react';
import './App.css';
import { Router } from '@reach/router';
import Header from './components/Header/Header';
import LoginPage from './components/Login/LoginPage';

class App extends React.Component {
  state = { loggedInUser: null };

  render() {
    const { loggedInUser } = this.state;
    return (
      <div className="app">
        <Header user={loggedInUser} logOut={this.logOut} />
        <Router>
          <LoginPage path="login" logIn={this.logIn} />
        </Router>
      </div>
    );
  }

  logIn = user => {
    this.setState({ loggedInUser: user });
  };

  logOut = () => {
    this.setState({ loggedInUser: null });
  };
}

export default App;
