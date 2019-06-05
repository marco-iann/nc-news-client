import React from 'react';
import { deleteComment } from '../../api';

class CommentsList extends React.Component {
  state = { commentsCount: this.props.commentsCount };

  render() {
    const { comments, loggedInUser } = this.props;
    return (
      <div>
        <h5>Comments: {this.props.commentsCount}</h5>
        {comments.map(comment => {
          return (
            <div key={`comment${comment.comment_id}`}>
              <h5>{comment.author}</h5>
              <p>{comment.created_at}</p>
              <p>{comment.body}</p>
              {comment.author === loggedInUser && (
                <button>Delete comment</button>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

export default CommentsList;
