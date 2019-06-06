import React from 'react';
import TopicsList from './TopicsList';
import { getTopics } from '../../api';

class TopicsPage extends React.Component {
  state = { topics: [] };

  componentDidMount() {
    getTopics().then(topics => this.setState({ topics }));
  }

  render() {
    const { topics } = this.state;
    return (
      <div>
        <h3>Topics</h3>
        <ul>
          <TopicsList topics={topics} />
        </ul>
      </div>
    );
  }
}

export default TopicsPage;
