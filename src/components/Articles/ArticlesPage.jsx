import React from 'react';
import ArticlesList from './ArticlesList';
import { Link } from '@reach/router';
import { getArticles } from '../../api';

class ArticlesPage extends React.Component {
  state = { articles: [], articles_count: 0, sort_by: '' };

  componentDidMount() {
    const { topic } = this.props;
    getArticles({ topic }).then(({ articles, articles_count }) =>
      this.setState({ articles, articles_count })
    );
  }

  componentDidUpdate(prevProps, prevState) {
    const { sort_by } = this.state;
    const { topic } = this.props;
    if (prevState.sort_by !== sort_by) {
      getArticles({ topic, sort_by }).then(({ articles, articles_count }) =>
        this.setState({ articles, articles_count })
      );
    }
  }

  render() {
    const { articles } = this.state;
    const { loggedInUser } = this.props;
    return (
      <div>
        <h3>Articles</h3>
        <form>
          <label>
            Order:
            <select onChange={this.changeSorting}>
              <option value="created_at">Newest</option>
              <option value="comments_count">Most Commented</option>
              <option value="votes">Most Voted</option>
            </select>
          </label>
        </form>
        <ArticlesList articles={articles} />
        {loggedInUser && <Link to="/addArticle">New Article</Link>}
      </div>
    );
  }

  changeSorting = e => {
    this.setState({ sort_by: e.target.value });
  };
}

export default ArticlesPage;
