import React from 'react';
import './App.css';
import { Router, navigate } from '@reach/router';
import Header from './components/Header/Header';
import TopicsPage from './components/Topics/TopicsPage';
import ArticlesPage from './components/Articles/ArticlesPage';
import ArticleView from './components/Articles/ArticleView';
import NewArticle from './components/Articles/NewArticle';
import LoginPage from './components/Users/LoginPage';
import SignUpPage from './components/Users/SignUpPage';
import Dashboard from './components/Users/Dashboard';
import Error from './components/Error';

class App extends React.Component {
  state = { loggedInUser: null };

  componentDidMount() {
    if (localStorage.loggedInUser)
      this.setUser(JSON.parse(localStorage.loggedInUser));
  }

  render() {
    const { loggedInUser } = this.state;
    const user = loggedInUser ? loggedInUser.username : null;
    return (
      <div className="app">
        <Header user={user} logOut={this.logOut} />
        <Router>
          <TopicsPage path="/" />
          <TopicsPage path="topics" />
          <ArticlesPage path="articles" loggedInUser={user} />
          <ArticleView path="articles/:article_id" loggedInUser={user} />
          <ArticlesPage path="topics/:topic" loggedInUser={user} />
          <NewArticle path="/addArticle" loggedInUser={user} />
          <Dashboard path="/dashboard" loggedInUser={loggedInUser} />
          <LoginPage path="/login" logIn={this.setUser} />
          <SignUpPage path="/signup" logIn={this.setUser} />
          <Error default />
        </Router>
      </div>
    );
  }

  setUser = user => {
    const userToSave = user ? JSON.stringify(user) : null;
    localStorage.setItem('loggedInUser', userToSave);
    this.setState({ loggedInUser: user });
  };

  logOut = () => {
    this.setUser(null);
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };
}

export default App;
