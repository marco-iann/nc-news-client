import React from 'react';
import { navigate } from '@reach/router';
import { getArticleById, patchArticle, deleteArticle } from '../../api';
import CommentsList from '../Comments/CommentsList';

class ArticleView extends React.Component {
  state = { selectedArticle: null, voteChange: 0 };

  componentDidMount() {
    getArticleById(this.props.article_id).then(article => {
      this.setState({ selectedArticle: article });
    });
  }

  render() {
    const { selectedArticle, voteChange } = this.state;
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
    return (
      selectedArticle && (
        <div>
          <h3>{title}</h3>
          {author === loggedInUser && (
            <button onClick={() => this.removeArticle(article_id)}>
              Delete article
            </button>
          )}
          <h6>{author}</h6>
          <p>{created_at}</p>
          <p>{body}</p>
          <p>Votes: {votes + voteChange}</p>
          {loggedInUser && (
            <>
              <button
                disabled={voteChange === 1}
                onClick={() => this.handleVote(1)}
              >
                Upvote
              </button>
              <button
                disabled={voteChange === -1}
                onClick={() => this.handleVote(-1)}
              >
                Downvote
              </button>
            </>
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
