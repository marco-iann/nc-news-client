import React from 'react';
import { Link } from '@reach/router';

const TopicsList = ({ topics }) => {
  return (
    <div>
      {topics.map((topic, i) => {
        return (
          <div key={`topic${i}`}>
            <h5>{topic.slug}</h5>
            <p>{topic.description}</p>
            <Link to={`/articles/${topic.slug}`}>View related articles</Link>
          </div>
        );
      })}
    </div>
  );
};

export default TopicsList;
