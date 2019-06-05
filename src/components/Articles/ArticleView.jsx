import React from 'react';
import { getArticleById, postComment, patchArticle } from '../../api';
import CommentsList from './CommentsList';
import AddComment from './AddComment';

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
          {author === loggedInUser && <button>Delete article</button>}
          <h6>{author}</h6>
          <p>{created_at}</p>
          <p>{body}</p>
          <button
            disabled={voteChange === 1}
            onClick={() => this.handleVote(1)}
          >
            Upvote
          </button>
          <p>Votes: {votes + voteChange}</p>
          <button
            disabled={voteChange === -1}
            onClick={() => this.handleVote(-1)}
          >
            Downvote
          </button>
          <CommentsList
            articleId={this.props.article_id}
            commentsCount={comments_count}
            loggedInUser={loggedInUser}
          />
          {loggedInUser && <AddComment addComment={this.addComment} />}
        </div>
      )
    );
  }

  addComment = body => {
    postComment({
      article_id: this.state.selectedArticle.article_id,
      username: this.props.loggedInUser,
      body
    }).then(comment => {
      const comments = this.state.comments;
      comments.unshift(comment);
      this.setState({ comments });
    });
  };

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
}

export default ArticleView;
