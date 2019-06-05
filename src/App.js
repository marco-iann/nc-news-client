import React from 'react';
import './App.css';
import { Router, navigate } from '@reach/router';
import Header from './components/Header/Header';
import TopicsPage from './components/Topics/TopicsPage';
import ArticlesPage from './components/Articles/ArticlesPage';
import ArticleView from './components/Articles/ArticleView';
import AddArticle from './components/Articles/AddArticle';
import LoginPage from './components/Users/LoginPage';
import SignInPage from './components/Users/SignInPage';
import Dashboard from './components/Users/Dashboard';

class App extends React.Component {
  state = { loggedInUser: 'weegembump' };

  render() {
    const { loggedInUser } = this.state;
    return (
      <div className="app">
        <Header user={loggedInUser} logOut={this.logOut} />
        <Router>
          <TopicsPage path="topics" />
          <ArticlesPage path="articles" loggedInUser={loggedInUser} />
          <ArticleView
            path="articles/:article_id"
            loggedInUser={loggedInUser}
          />
          <ArticlesPage path="topics/:topic" loggedInUser={loggedInUser} />
          <AddArticle path="/addArticle" loggedInUser={loggedInUser} />
          <Dashboard path="dashboard" loggedInUser={loggedInUser} />
          <LoginPage path="login" logIn={this.setUser} />
          <SignInPage path="signin" logIn={this.setUser} />
        </Router>
      </div>
    );
  }

  setUser = user => {
    this.setState({ loggedInUser: user });
    navigate('/dashboard');
  };

  logOut = () => {
    this.setUser(null);
    navigate('/login');
  };
}

export default App;
