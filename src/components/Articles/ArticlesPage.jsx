import React from 'react';
import ArticlesList from './ArticlesList';
import { getArticles } from '../../api';

class ArticlesPage extends React.Component {
  state = { articles: [], articles_count: 0 };

  componentDidMount() {
    getArticles().then(({ articles, articles_count }) =>
      this.setState({ articles, articles_count })
    );
  }

  render() {
    const { articles } = this.state;
    return (
      <div>
        <h3>Articles</h3>
        <ArticlesList articles={articles} />
      </div>
    );
  }
}

export default ArticlesPage;
