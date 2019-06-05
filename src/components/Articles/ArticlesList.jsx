import React from 'react';
import { Link } from '@reach/router';

const ArticlesList = ({ articles }) => {
  return (
    <div>
      {articles.map(article => {
        const { article_id, title, author } = article;
        return (
          <div key={`article${article_id}`}>
            <h3>
              <Link to={`/articles/${article_id}`}>{title}</Link>
            </h3>
            <p>{author}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ArticlesList;
