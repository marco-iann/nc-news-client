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
import Error from './components/Error';

class App extends React.Component {
  state = { loggedInUser: null };

  componentDidMount() {
    if (localStorage.loggedInUser) this.setUser(localStorage.loggedInUser);
  }

  render() {
    const { loggedInUser } = this.state;
    return (
      <div className="app">
        <Header user={loggedInUser} logOut={this.logOut} />
        <Router>
          <LoginPage path="/" logIn={this.setUser} />
          <TopicsPage path="topics" />
          <ArticlesPage path="articles" loggedInUser={loggedInUser} />
          <ArticleView
            path="articles/:article_id"
            loggedInUser={loggedInUser}
          />
          <ArticlesPage path="topics/:topic" loggedInUser={loggedInUser} />
          <AddArticle path="/addArticle" loggedInUser={loggedInUser} />
          <Dashboard path="/dashboard" loggedInUser={loggedInUser} />
          <LoginPage path="/login" logIn={this.setUser} />
          <SignInPage path="/signin" logIn={this.setUser} />
          <Error default />
        </Router>
      </div>
    );
  }

  setUser = user => {
    localStorage.setItem('loggedInUser', user);
    this.setState({ loggedInUser: user });
    navigate('/dashboard');
  };

  logOut = () => {
    this.setUser(null);
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };
}

export default App;
