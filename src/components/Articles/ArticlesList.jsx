import React from 'react';
import { Link } from '@reach/router';

const ArticlesList = ({ articles }) => {
  return (
    <ul>
      {articles.map(article => {
        const { article_id, title, author } = article;
        return (
          <li key={`article${article_id}`}>
            <h3>
              <Link to={`/articles/${article_id}`}>{title}</Link>
            </h3>
            <p>{author}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default ArticlesList;
