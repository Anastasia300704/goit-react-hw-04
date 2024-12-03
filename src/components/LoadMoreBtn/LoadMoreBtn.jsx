import React from 'react';
import styles from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onClick }) => (
  <button className={styles.loadMore} onClick={onClick}>
    Load More
  </button>
);

export default LoadMoreBtn;
