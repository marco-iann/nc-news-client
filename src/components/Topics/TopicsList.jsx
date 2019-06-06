import React from 'react';
import { Link } from '@reach/router';

const TopicsList = ({ topics }) => {
  return (
    <>
      {topics.map((topic, i) => {
        return (
          <li key={`topic${i}`}>
            <h3>
              <Link to={`/topics/${topic.slug}`}>{topic.slug}</Link>
            </h3>
            <p>{topic.description}</p>
          </li>
        );
      })}
    </>
  );
};

export default TopicsList;
