import React from 'react';
import { Link } from '@reach/router';

const ArticlesList = ({ articles }) => {
  return (
    <div>
      {articles.map(article => {
        const { article_id, title, author } = article;
        return (
          <div key={`article${article_id}`}>
            <h5>{title}</h5>
            <p>{author}</p>
            <Link to={`${article_id}`}>View Article</Link>
          </div>
        );
      })}
    </div>
  );
};

export default ArticlesList;
