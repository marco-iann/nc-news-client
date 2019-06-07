import React from 'react';
import ArticlesList from './ArticlesList';
// import './Articles.css';
import { Link } from '@reach/router';
import { getArticles } from '../../api';

class ArticlesPage extends React.Component {
  state = { articles: [], articles_count: 0, sort_by: '', p: 1 };

  componentDidMount() {
    const { topic } = this.props;
    getArticles({ topic }).then(({ articles, articles_count }) =>
      this.setState({ articles, articles_count })
    );
  }

  componentDidUpdate(prevProps, prevState) {
    const { sort_by, p } = this.state;
    const { topic } = this.props;
    if (prevState.sort_by !== sort_by) {
      getArticles({ topic, sort_by }).then(({ articles, articles_count }) =>
        this.setState({ articles, articles_count })
      );
    }
    if (prevState.p !== p) {
      getArticles({ topic, p }).then(({ articles, articles_count }) =>
        this.setState({ articles, articles_count })
      );
    }
  }

  render() {
    const { articles, articles_count } = this.state;
    const { loggedInUser } = this.props;
    const pages = Array.from({ length: Math.ceil(articles_count / 10) });
    return (
      <div className="ui container segment">
        <h2>Articles</h2>
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
        {pages.length > 1 &&
          pages.map((page, i) => {
            const currentPage = i + 1;
            return (
              <button
                key={`page${currentPage}`}
                onClick={() => this.updatePage(currentPage)}
                disabled={currentPage === this.state.p}
              >
                {currentPage}
              </button>
            );
          })}
        {loggedInUser && <Link to="/addArticle">New Article</Link>}
      </div>
    );
  }

  updateSorting = e => {
    this.setState({ sort_by: e.target.value });
  };

  updatePage = page => {
    this.setState({ p: page });
  };
}

export default ArticlesPage;
