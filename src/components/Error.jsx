import React from 'react';

const Error = ({ err }) => {
  if (err) {
    const status = err.response.status;
    const msg = err.response.data.msg;
    return (
      <div className="ui container segment">
        <h2>
          {status} - {msg}
        </h2>
      </div>
    );
  }
  return (
    <div className="ui container segment">
      <h2>404 - page not found</h2>
    </div>
  );
};

export default Error;
