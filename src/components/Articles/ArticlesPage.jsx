import React from 'react';
import ArticlesList from './ArticlesList';
import { Link } from '@reach/router';
import { getArticles } from '../../api';

class ArticlesPage extends React.Component {
  state = { articles: [], articles_count: 0 };

  componentDidMount() {
    const { topic } = this.props;
    getArticles({ topic }).then(({ articles, articles_count }) =>
      this.setState({ articles, articles_count })
    );
  }

  render() {
    const { articles } = this.state;
    const { loggedInUser } = this.props;
    return (
      <div>
        <h3>Articles</h3>
        <ArticlesList articles={articles} />
        {loggedInUser && <Link to="/addArticle">New Article</Link>}
      </div>
    );
  }
}

export default ArticlesPage;
