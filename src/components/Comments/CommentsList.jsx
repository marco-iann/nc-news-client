import React from 'react';
import CommentView from './CommentView';
import AddComment from '../Comments/AddComment';
import { getCommentsByArticleId, postComment } from '../../api';

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
    const { loggedInUser } = this.props;
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
        {loggedInUser && <AddComment addComment={this.addComment} />}
      </div>
    );
  }

  addComment = body => {
    postComment({
      article_id: this.props.articleId,
      username: this.props.loggedInUser,
      body
    }).then(comment => {
      const comments = this.state.comments;
      comments.unshift(comment);
      this.setState({ comments });
    });
  };
}

export default CommentsList;
