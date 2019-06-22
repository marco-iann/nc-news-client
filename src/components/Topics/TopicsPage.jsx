import React from 'react';
import TopicsList from './TopicsList';
import Loader from '../Loader';
import Error from '../Error';
import { getTopics } from '../../api';

class TopicsPage extends React.Component {
  state = { topics: null, err: null };

  componentDidMount() {
    getTopics()
      .then(topics => this.setState({ topics }))
      .catch(err => this.setState({ err }));
  }

  render() {
    const { topics, err } = this.state;
    const renderedTopics = err ? (
      <Error err={err} />
    ) : (
      <ul>
        <TopicsList topics={topics} />
      </ul>
    );
    return (
      <div className="ui container segment">
        <h2>Topics</h2>
        {topics || err ? renderedTopics : <Loader />}
      </div>
    );
  }
}

export default TopicsPage;
