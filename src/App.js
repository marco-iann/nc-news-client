import React from 'react';
import './App.css';
import { Router } from '@reach/router';
import Header from './components/Header/Header';
import TopicsPage from './components/Topics/TopicsPage';
import LoginPage from './components/Login/LoginPage';

class App extends React.Component {
  state = { loggedInUser: null };

  render() {
    const { loggedInUser } = this.state;
    return (
      <div className="app">
        <Header user={loggedInUser} logOut={() => this.setUser(null)} />
        <Router>
          <TopicsPage path="topics" />
          <LoginPage path="login" logIn={this.setUser} />
        </Router>
      </div>
    );
  }

  setUser = user => {
    this.setState({ loggedInUser: user });
  };
}

export default App;
