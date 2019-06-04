import React from 'react';

const CommentsList = props => {
  const { comments } = props;
  return (
    <div>
      {comments.map(comment => {
        return (
          <div key={`comment${comment.comment_id}`}>
            <h5>{comment.author}</h5>
            <p>{comment.created_at}</p>
            <p>{comment.body}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CommentsList;
