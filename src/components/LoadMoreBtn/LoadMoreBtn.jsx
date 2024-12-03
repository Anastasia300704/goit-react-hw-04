import React from 'react';
import styles from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'block',
        margin: '20px auto',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
      }}
    >
      Load More
    </button>
  );
};

export default LoadMoreBtn;

