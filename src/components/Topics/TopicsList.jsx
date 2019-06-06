import React from 'react';
import { Link } from '@reach/router';

const TopicsList = ({ topics }) => {
  return (
    <>
      {topics.map((topic, i) => {
        return (
          <li key={`topic${i}`}>
            <h5>
              <Link to={`/topics/${topic.slug}`}>{topic.slug}</Link>
            </h5>
            <p>{topic.description}</p>
          </li>
        );
      })}
    </>
  );
};

export default TopicsList;
