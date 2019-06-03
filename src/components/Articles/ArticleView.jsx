import React from 'react';
import { getArticleById } from '../../api';
import CommentsList from './CommentsList';

class ArticleView extends React.Component {
  state = { selectedArticle: {}, comments: [] };

  componentDidMount() {
    getArticleById(this.props.article_id).then(([article, comments]) => {
      this.setState({ selectedArticle: article, comments });
    });
  }

  render() {
    const { selectedArticle, comments } = this.state;
    return (
      selectedArticle && (
        <div>
          <h5>{selectedArticle.title}</h5>
          <h6>{selectedArticle.author}</h6>
          <p>{selectedArticle.body}</p>
          <CommentsList comments={comments} />
        </div>
      )
    );
  }
}

export default ArticleView;
