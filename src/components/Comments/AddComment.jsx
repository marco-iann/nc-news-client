import React from 'react';
import './Comments.css';

class AddComment extends React.Component {
  state = { commentInput: '' };
  render() {
    const { commentInput } = this.state;
    return (
      <form className="ui form" onSubmit={this.postComment}>
        <textarea
          onChange={this.saveInput}
          value={commentInput}
          placeholder="Write your comment here"
          required={true}
        />
        <div className="post-comment-button">
          <button className="ui blue button">
            <i className="icon edit" />
            Post
          </button>
        </div>
      </form>
    );
  }

  saveInput = e => {
    this.setState({ commentInput: e.target.value });
  };

  postComment = e => {
    e.preventDefault();
    this.props.addComment(this.state.commentInput);
    this.setState({ commentInput: '' });
  };
}

export default AddComment;
