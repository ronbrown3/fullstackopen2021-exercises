import React from 'react';

const Notification = ({ notification }) => {
  const { message, type } = notification;

  if (message === null) {
    return null;
  }

  return <div className={type}>{message}</div>;
};

export default Notification;
