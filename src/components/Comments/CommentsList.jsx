import React from 'react';
import CommentView from './CommentView';
import AddComment from '../Comments/AddComment';
import { getCommentsByArticleId, postComment, deleteComment } from '../../api';

class CommentsList extends React.Component {
  state = { comments: [], commentsCount: 0, p: 1 };

  componentDidMount() {
    const articleId = this.props.articleId;
    getCommentsByArticleId(articleId).then(({ comments }) =>
      this.setState({ comments, commentsCount: +this.props.commentsCount })
    );
  }

  componentDidUpdate(prevProps, prevState) {
    const { p } = this.state;
    if (prevState.p !== p) {
      getCommentsByArticleId(this.props.articleId, { p }).then(({ comments }) =>
        this.setState({ comments, commentsCount: this.props.commentsCount })
      );
    }
  }

  render() {
    const { comments, commentsCount } = this.state;
    const { loggedInUser } = this.props;
    const pages = Array.from({ length: Math.ceil(commentsCount / 10) });
    return (
      <div>
        <h5>Comments: {commentsCount}</h5>
        <ul>
          {comments.map(comment => {
            const { comment_id } = comment;
            return (
              <CommentView
                key={`comment${comment_id}`}
                comment={comment}
                loggedInUser={this.props.loggedInUser}
                removeComment={this.removeComment}
              />
            );
          })}
        </ul>
        {pages.length > 1 &&
          pages.map((page, i) => {
            const currentPage = i + 1;
            return (
              <button
                key={`page${currentPage}`}
                onClick={() => this.updatePage(currentPage)}
                disabled={currentPage === this.state.p}
              >
                {currentPage}
              </button>
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
      this.setState(prevState => ({
        comments,
        commentsCount: prevState.commentsCount + 1
      }));
    });
  };

  removeComment = id => {
    deleteComment(id).then(() => {
      const articleId = this.props.articleId;
      getCommentsByArticleId(articleId).then(({ comments }) =>
        this.setState(prevState => ({
          comments,
          commentsCount: prevState.commentsCount - 1
        }))
      );
    });
  };

  updatePage = page => {
    this.setState({ p: page });
  };
}

export default CommentsList;
