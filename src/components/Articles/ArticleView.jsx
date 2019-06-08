import React from 'react';
import { navigate } from '@reach/router';
import moment from 'moment';
import { getArticleById, patchArticle, deleteArticle } from '../../api';
import CommentsList from '../Comments/CommentsList';
import Error from '../Error';

class ArticleView extends React.Component {
  state = { selectedArticle: null, voteChange: 0, err: null };

  componentDidMount() {
    getArticleById(this.props.article_id)
      .then(article => {
        this.setState({ selectedArticle: article });
      })
      .catch(err => this.setState({ err }));
  }

  render() {
    const { selectedArticle, voteChange, err } = this.state;
    const { loggedInUser } = this.props;
    const {
      article_id,
      title,
      author,
      created_at,
      body,
      votes,
      comments_count
    } = selectedArticle ? selectedArticle : {};
    if (err) return <Error err={err} />;
    return (
      selectedArticle && (
        <div className="ui container segment">
          <h2>{title}</h2>
          <h6 className="author">{author}</h6>
          <p className="date">{moment(created_at).fromNow()}</p>
          <p>{body}</p>
          <p>
            <i className="like red icon" />
            {votes + voteChange}
          </p>
          {loggedInUser && (
            <div className="article-buttons">
              <button
                className="ui vertical animated button"
                disabled={voteChange === 1}
                onClick={() => this.handleVote(1)}
              >
                <div className="hidden content">Like</div>
                <div className="visible content">
                  <i className="thumbs up icon" />
                </div>
              </button>
              <button
                className="ui vertical animated button"
                disabled={voteChange === -1}
                onClick={() => this.handleVote(-1)}
              >
                <div className="hidden content">Dislike</div>
                <div className="visible content">
                  <i className="thumbs down icon" />
                </div>
              </button>
              {author === loggedInUser && (
                <button
                  className="ui button red"
                  onClick={() => this.removeArticle(article_id)}
                >
                  Delete
                </button>
              )}
            </div>
          )}
          <CommentsList
            articleId={this.props.article_id}
            commentsCount={comments_count}
            loggedInUser={loggedInUser}
          />
        </div>
      )
    );
  }

  handleVote = direction => {
    this.setState(prevState => {
      return { voteChange: prevState.voteChange + direction };
    });
    patchArticle(this.props.article_id, direction).catch(() =>
      this.setState(prevState => {
        return { voteChange: prevState.voteChange - direction };
      })
    );
  };

  removeArticle = article_id => {
    deleteArticle(article_id).then(() => navigate('/articles'));
  };
}

export default ArticleView;
