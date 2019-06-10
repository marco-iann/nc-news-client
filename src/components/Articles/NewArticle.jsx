import React from 'react';
import { navigate } from '@reach/router';
import './Articles.css';
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
      <div className="ui container segment">
        <form className="ui form" onSubmit={this.submitArticle}>
          <div className="field">
            <label>
              Title
              <input
                name="title"
                placeholder="Title"
                type="text"
                value={title}
                onChange={this.saveInput}
                required={true}
              />
            </label>
          </div>
          <div className="field">
            <label>
              Article
              <textarea
                name="body"
                placeholder="Article text here"
                value={body}
                onChange={this.saveInput}
                required={true}
              />
            </label>
          </div>
          <div className="field">
            <select
              className="ui fluid selection dropdown"
              onChange={this.selectTopic}
            >
              {topics.map((topic, i) => {
                return (
                  <option value={i} key={`topic${i}`}>
                    {topic.slug}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="post-article-button">
            <button className="ui blue button" onClick={this.submitArticle}>
              <i className="icon edit" />
              Post
            </button>
          </div>
        </form>
      </div>
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
