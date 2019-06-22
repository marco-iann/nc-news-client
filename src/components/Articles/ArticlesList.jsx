import React from 'react';
import moment from 'moment';
import './Articles.css';
import { Link } from '@reach/router';

const ArticlesList = ({ articles }) => {
  return (
    <ul>
      {articles.map(article => {
        const {
          article_id,
          title,
          author,
          topic,
          created_at,
          votes,
          comments_count
        } = article;
        return (
          <li className="ui segment article" key={article_id}>
            <Link className="article-link" to={`/articles/${article_id}`}>
              <h6 className="article-topic">{topic}</h6>
              <h3 className="entry article-title">{title}</h3>
              <h6 className="article-author">{author}</h6>
              <p className="article-date">{moment(created_at).fromNow()}</p>
              <div className="icons">
                <i className="like red icon" />
                {votes}
              </div>
              <div className="icons">
                <i className="icon comment black alternate" />
                {comments_count}
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default ArticlesList;
