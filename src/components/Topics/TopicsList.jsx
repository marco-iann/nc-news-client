import React from 'react';
import { Link } from '@reach/router';

const TopicsList = ({ topics }) => {
  return (
    <div>
      {topics.map((topic, i) => {
        return (
          <div key={`topic${i}`}>
            <h5>
              <Link to={`/topics/${topic.slug}`}>{topic.slug}</Link>
            </h5>
            <p>{topic.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default TopicsList;
