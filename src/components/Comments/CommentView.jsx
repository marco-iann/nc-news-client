import React from 'react';

class CommentView extends React.Component {
  state = { comment: this.props.comment, votes: 0 };

  render() {
    const { comment } = this.state;
    const { loggedInUser } = this.props;
    const { author, body, created_at, votes } = comment ? comment : {};
    return (
      <div>
        <h5>{author}</h5>
        <p>{created_at}</p>
        <p>{body}</p>
        <button>Upvote</button>
        <p>Votes: {votes}</p>
        <button>Downvote</button>
        {author === loggedInUser && <button>Delete comment</button>}
      </div>
    );
  }
}

export default CommentView;
