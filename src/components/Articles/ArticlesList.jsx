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
            <Link className="article-link" to={`/articles/${article_id}`}>
              <h3 className="entry article-title">{title}</h3>
            </Link>
            <h6 className="author">{author}</h6>
            <p className="date">{moment(created_at).fromNow()}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default ArticlesList;
