import React from 'react';

class AddComment extends React.Component {
  state = { commentInput: '' };
  render() {
    const { commentInput } = this.state;
    return (
      <form onSubmit={this.postComment}>
        <textarea
          onChange={this.saveInput}
          value={commentInput}
          placeholder="Write your comment here"
          required={true}
        />
        <button>Post</button>
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
