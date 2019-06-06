import React from 'react';
import { navigate } from '@reach/router';
import { getTopics, postArticle } from '../../api';

class AddArticle extends React.Component {
  state = { topics: [], title: '', body: '', selectedTopic: '' };

  componentDidMount() {
    getTopics().then(topics =>
      this.setState({ topics, selectedTopic: topics[0].slug })
    );
  }

  render() {
    const { topics, title, body } = this.state;
    return (
      <form onSubmit={this.submitArticle}>
        <input
          name="title"
          placeholder="Title"
          type="text"
          value={title}
          onChange={this.saveInput}
          required={true}
        />
        <textarea
          name="body"
          placeholder="Article text here"
          value={body}
          onChange={this.saveInput}
          required={true}
        />
        <select onChange={this.selectTopic}>
          {topics.map((topic, i) => {
            return <option key={`topic${i}`}>{topic.slug}</option>;
          })}
        </select>
        <button>Post</button>
      </form>
    );
  }

  saveInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  selectTopic = e => {
    this.setState({ selectedTopic: e.target.value });
  };

  submitArticle = e => {
    e.preventDefault();
    const username = this.props.loggedInUser;
    const { title, body, selectedTopic } = this.state;
    const newArticle = { username, title, body, topic: selectedTopic };
    postArticle(newArticle).then(article => {
      navigate('/articles/' + article.article_id);
    });
  };
}

export default AddArticle;
