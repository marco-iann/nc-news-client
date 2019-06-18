import React from 'react';
import ArticlesList from './ArticlesList';
import PageButtons from '../PageButtons';
import './Articles.css';
import { Link } from '@reach/router';
import { getArticles } from '../../api';

class ArticlesPage extends React.Component {
  state = { articles: [], articles_count: 0, sort_by: '', p: 1 };

  componentDidMount() {
    const { topic } = this.props;
    this.fetchArticles({ topic });
  }

  componentDidUpdate(prevProps, prevState) {
    const { sort_by, p } = this.state;
    const { topic } = this.props;
    if (prevState.sort_by !== sort_by) {
      this.fetchArticles({ topic, sort_by });
    }
    if (prevState.p !== p) {
      this.fetchArticles({ topic, p });
    }
  }

  render() {
    const { articles, articles_count, p } = this.state;
    const { loggedInUser } = this.props;
    const pages = Array.from({ length: Math.ceil(articles_count / 10) });
    return (
      <div className="ui container segment">
        <div className="articles-header">
          <h2>Articles</h2>
          {loggedInUser && (
            <Link className="ui button blue" to="/addArticle">
              <i className="icon edit" />
              Post new article
            </Link>
          )}
        </div>
        <form className="ui form">
          <div className="field">
            <label>
              Order:
              <select className="ui dropdown" onChange={this.updateSorting}>
                <option value="created_at">Newest</option>
                <option value="comments_count">Most Commented</option>
                <option value="votes">Most Voted</option>
              </select>
            </label>
          </div>
        </form>
        <ArticlesList articles={articles} />
        <PageButtons
          pages={pages}
          currentPage={p}
          updatePage={this.updatePage}
        />
      </div>
    );
  }

  updateSorting = e => {
    this.setState({ sort_by: e.target.value });
  };

  updatePage = page => {
    this.setState({ p: page });
  };

  fetchArticles = queries => {
    getArticles(queries).then(({ articles, articles_count }) =>
      this.setState({ articles, articles_count })
    );
  };
}

export default ArticlesPage;
