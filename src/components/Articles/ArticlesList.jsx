import React from 'react';

const ArticlesList = ({ articles }) => {
  return (
    <div>
      {articles.map(article => {
        const { article_id, title, author } = article;
        return (
          <div key={`article${article_id}`}>
            <h3>{title}</h3>
            <p>{author}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ArticlesList;
