import React from 'react';
import './Topics.css';
import { Link } from '@reach/router';

const TopicsList = ({ topics }) => {
  return (
    <>
      {topics.map((topic, i) => {
        return (
          <li className="ui segment topic-box" key={`topic${i}`}>
            <Link className="topic" to={`/topics/${topic.slug}`}>
              <h3>{topic.slug}</h3>
              <p className="topic-description">{topic.description}</p>
            </Link>
          </li>
        );
      })}
    </>
  );
};

export default TopicsList;
