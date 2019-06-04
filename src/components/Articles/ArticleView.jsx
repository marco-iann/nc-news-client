import React from 'react';
import { getArticleById, postComment } from '../../api';
import CommentsList from './CommentsList';
import AddComment from './AddComment';

class ArticleView extends React.Component {
  state = { selectedArticle: {}, comments: [] };

  componentDidMount() {
    getArticleById(this.props.article_id).then(([article, comments]) => {
      this.setState({ selectedArticle: article, comments });
    });
  }

  render() {
    const { selectedArticle, comments } = this.state;
    const { loggedInUser } = this.props;
    return (
      selectedArticle && (
        <div>
          <h3>{selectedArticle.title}</h3>
          <h6>{selectedArticle.author}</h6>
          <p>{selectedArticle.created_at}</p>
          <p>{selectedArticle.body}</p>
          <CommentsList comments={comments} />
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
