import React from 'react';

const TopicsList = ({ topics }) => {
  return (
    <div>
      {topics.map(topic => {
        return (
          <div>
            <h5>{topic.slug}</h5>
            <p>{topic.description}</p>
            <button>View Articles</button>
          </div>
        );
      })}
    </div>
  );
};

export default TopicsList;
