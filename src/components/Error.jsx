import React from 'react';

const Error = ({ err }) => {
  if (err) {
    const status = err.response.status;
    const msg = err.response.data.msg;
    return (
      <div>
        {status} - {msg}
      </div>
    );
  }
  return <div>404 - Page not found</div>;
};

export default Error;
