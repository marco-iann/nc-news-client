import React from 'react';
import moment from 'moment';
import { patchComment } from '../../api';

class CommentView extends React.Component {
  state = { comment: this.props.comment, voteChange: 0 };

  render() {
    const { comment, voteChange } = this.state;
    const { loggedInUser } = this.props;
    const { author, body, created_at, votes } = comment ? comment : {};
    return (
      <li>
        <h5>{author}</h5>
        <p>{moment(created_at).fromNow()}</p>
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
        {author === loggedInUser && (
          <button onClick={() => this.props.removeComment(comment.comment_id)}>
            Delete comment
          </button>
        )}
      </li>
    );
  }

  handleVote = direction => {
    this.setState(prevState => {
      return { voteChange: prevState.voteChange + direction };
    });
    patchComment(this.props.comment.comment_id, direction).catch(() =>
      this.setState(prevState => {
        return { voteChange: prevState.voteChange - direction };
      })
    );
  };
}

export default CommentView;
