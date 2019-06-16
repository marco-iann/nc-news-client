import React from 'react';
import CommentView from './CommentView';
import NewComment from '../Comments/NewComment';
import PageButtons from '../PageButtons';
import { getCommentsByArticleId, postComment, remove } from '../../api';

class CommentsList extends React.Component {
  state = { comments: [], commentsCount: 0, p: 1 };

  componentDidMount() {
    const articleId = this.props.articleId;
    getCommentsByArticleId(articleId).then(({ comments }) =>
      this.setState({ comments, commentsChange: 0 })
    );
  }

  componentDidUpdate(prevProps, prevState) {
    const { p } = this.state;
    if (prevState.p !== p) {
      getCommentsByArticleId(this.props.articleId, { p }).then(({ comments }) =>
        this.setState({ comments })
      );
    }
  }

  render() {
    const { comments, p } = this.state;
    const { loggedInUser } = this.props;
    const commentsCount = +this.props.commentsCount + this.state.commentsChange;
    const pages = Array.from({ length: Math.ceil(commentsCount / 10) });
    return (
      <div className="comments-box">
        <h5>Comments: {commentsCount}</h5>
        {loggedInUser && <NewComment addComment={this.addComment} />}
        <ul>
          {comments.map(comment => {
            const { comment_id } = comment;
            return (
              <CommentView
                key={`comment${comment_id}`}
                comment={comment}
                loggedInUser={this.props.loggedInUser}
                deleteComment={this.deleteComment}
              />
            );
          })}
        </ul>
        <PageButtons
          pages={pages}
          currentPage={p}
          updatePage={this.updatePage}
        />
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
        commentsChange: prevState.commentsChange + 1
      }));
    });
  };

  deleteComment = id => {
    remove('comments', id).then(() => {
      const articleId = this.props.articleId;
      getCommentsByArticleId(articleId).then(({ comments }) =>
        this.setState(prevState => ({
          comments,
          commentsChange: prevState.commentsChange - 1
        }))
      );
    });
  };

  updatePage = page => {
    this.setState({ p: page });
  };
}

export default CommentsList;
