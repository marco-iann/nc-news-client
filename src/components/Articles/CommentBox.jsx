import React from 'react';

class CommentBox extends React.Component {
  state = { commentInput: '' };
  render() {
    const { commentInput } = this.state;
    return (
      <form>
        <textarea
          onChange={this.saveInput}
          value={commentInput}
          placeholder="Write your comment here"
        />
        <button
          onClick={e => {
            e.preventDefault();
            this.props.addComment(commentInput);
            this.setState({ commentInput: '' });
          }}
        >
          Post
        </button>
      </form>
    );
  }

  saveInput = e => {
    this.setState({ commentInput: e.target.value });
  };
}

export default CommentBox;
