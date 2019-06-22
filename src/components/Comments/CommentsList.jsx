import React from 'react';
import CommentView from './CommentView';
import NewComment from '../Comments/NewComment';
import PageButtons from '../PageButtons';
import Error from '../Error';
import Loader from '../Loader';
import { getCommentsByArticleId, postComment, remove } from '../../api';

class CommentsList extends React.Component {
  state = { comments: null, commentsCount: 0, p: 1, err: null };

  componentDidMount() {
    const articleId = this.props.articleId;
    getCommentsByArticleId(articleId)
      .then(({ comments }) => this.setState({ comments, commentsChange: 0 }))
      .catch(err => this.setState({ err }));
  }

  componentDidUpdate(prevProps, prevState) {
    const { p } = this.state;
    if (prevState.p !== p) {
      getCommentsByArticleId(this.props.articleId, { p })
        .then(({ comments }) => this.setState({ comments }))
        .catch(err => this.setState({ err }));
    }
  }

  render() {
    const { comments, p, err } = this.state;
    const { loggedInUser } = this.props;
    const commentsCount = +this.props.commentsCount + this.state.commentsChange;
    const pages = Array.from({ length: Math.ceil(commentsCount / 10) });
    const renderedComments = comments ? (
      <div>
        <ul>
          {comments.map(comment => {
            const { comment_id } = comment;
            return (
              <CommentView
                key={comment_id}
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
    ) : (
      <Error err={err} />
    );
    return (
      <div className="comments-box">
        <h5>Comments: {commentsCount}</h5>
        {loggedInUser && <NewComment addComment={this.addComment} />}
        {comments || err ? renderedComments : <Loader />}
      </div>
    );
  }

  addComment = body => {
    postComment({
      article_id: this.props.articleId,
      username: this.props.loggedInUser,
      body
    })
      .then(comment => {
        const comments = this.state.comments;
        comments.unshift(comment);
        this.setState(prevState => ({
          comments,
          commentsChange: prevState.commentsChange + 1
        }));
      })
      .catch(err => this.setState({ err }));
  };

  deleteComment = id => {
    remove('comments', id).then(() => {
      const articleId = this.props.articleId;
      getCommentsByArticleId(articleId)
        .then(({ comments }) =>
          this.setState(prevState => ({
            comments,
            commentsChange: prevState.commentsChange - 1
          }))
        )
        .catch(err => this.setState({ err }));
    });
  };

  updatePage = page => {
    this.setState({ p: page });
  };
}

export default CommentsList;
