import React from 'react';
import TopicsList from './TopicsList';
import Loader from '../Loader';
import { getTopics } from '../../api';

class TopicsPage extends React.Component {
  state = { topics: [] };

  componentDidMount() {
    getTopics().then(topics => this.setState({ topics }));
  }

  render() {
    const { topics } = this.state;
    return (
      <div className="ui container segment">
        <h2>Topics</h2>
        {topics.length === 0 ? (
          <Loader />
        ) : (
          <ul>
            <TopicsList topics={topics} />
          </ul>
        )}
      </div>
    );
  }
}

export default TopicsPage;
