import React from 'react';
import { getArticleById, getCommentsByArticleId, postComment } from '../../api';
import CommentsList from './CommentsList';
import AddComment from './AddComment';

class ArticleView extends React.Component {
  state = { selectedArticle: {}, comments: [] };

  componentDidMount() {
    Promise.all([
      getArticleById(this.props.article_id),
      getCommentsByArticleId(this.props.article_id)
    ]).then(([article, comments]) => {
      this.setState({ selectedArticle: article, comments });
    });
  }

  render() {
    const { selectedArticle } = this.state;
    const { loggedInUser } = this.props;
    return (
      selectedArticle && (
        <div>
          <h3>{selectedArticle.title}</h3>
          {selectedArticle.author === loggedInUser && (
            <button>Delete article</button>
          )}
          <h6>{selectedArticle.author}</h6>
          <p>{selectedArticle.created_at}</p>
          <p>{selectedArticle.body}</p>
          <CommentsList
            article_id={this.props.article_id}
            loggedInUser={loggedInUser}
          />
          {loggedInUser && <AddComment addComment={this.addComment} />}
        </div>
      )
    );
  }

  addComment = body => {
    postComment({
      article_id: this.state.selectedArticle.article_id,
      username: this.props.loggedInUser,
      body
    }).then(comment => {
      const comments = this.state.comments;
      comments.unshift(comment);
      this.setState({ comments });
    });
  };
}

export default ArticleView;
