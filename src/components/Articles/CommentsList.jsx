import React from 'react';

const CommentsList = props => {
  const { comments, loggedInUser } = props;
  return (
    <div>
      <h5>Comments: {props.commentsCount}</h5>
      {comments.map(comment => {
        return (
          <div key={`comment${comment.comment_id}`}>
            <h5>{comment.author}</h5>
            <p>{comment.created_at}</p>
            <p>{comment.body}</p>
            {comment.author === loggedInUser && <button>Delete comment</button>}
          </div>
        );
      })}
    </div>
  );
};

export default CommentsList;
