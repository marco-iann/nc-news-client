import React from 'react';
import moment from 'moment';
import { Link } from '@reach/router';

const ArticlesList = ({ articles }) => {
  return (
    <ul>
      {articles.map(article => {
        const { article_id, title, author, created_at } = article;
        return (
          <li key={`article${article_id}`}>
            <h3>
              <Link to={`/articles/${article_id}`}>{title}</Link>
            </h3>
            <p>{moment(created_at).fromNow()}</p>
            <p>{author}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default ArticlesList;
