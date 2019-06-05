import React from 'react';
import CommentView from './CommentView';
import { getCommentsByArticleId } from '../../api';

class CommentsList extends React.Component {
  state = { comments: [] };

  componentDidMount() {
    const articleId = this.props.articleId;
    getCommentsByArticleId(articleId).then(comments =>
      this.setState({ comments })
    );
  }

  render() {
    const { comments } = this.state;
    return (
      <div>
        <h5>Comments: {this.props.commentsCount}</h5>
        {comments.map(comment => {
          const { comment_id } = comment;
          return (
            <CommentView
              key={`comment${comment_id}`}
              comment={comment}
              loggedInUser={this.props.loggedInUser}
            />
          );
        })}
      </div>
    );
  }
}

export default CommentsList;
