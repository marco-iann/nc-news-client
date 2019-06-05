import React from 'react';
import { getCommentsByArticleId, deleteComment } from '../../api';

class CommentsList extends React.Component {
  state = { comments: [] };

  componentDidMount() {
    const articleId = this.props.articleId;
    getCommentsByArticleId(articleId).then(comments =>
      this.setState({ comments })
    );
  }

  render() {
    const { loggedInUser } = this.props;
    const { comments } = this.state;
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

  handleDeleteComment = id => {
    deleteComment(id);
  };
}

export default CommentsList;
