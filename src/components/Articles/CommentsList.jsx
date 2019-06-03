import React from 'react';

const CommentsList = props => {
  const { comments } = props;
  return (
    <>
      {comments.map(comment => {
        return (
          <div>
            <h5>{comment.author}</h5>
            <p>{comment.body}</p>
          </div>
        );
      })}
    </>
  );
};

export default CommentsList;
