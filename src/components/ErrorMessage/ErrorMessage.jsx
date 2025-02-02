// src/components/ErrorMessage/ErrorMessage.jsx
import React from 'react';
import styles from './ErrorMessage.module.css';

const ErrorMessage = () => {
  return <p className={styles.error}>Oops! Something went wrong. Please try again.</p>;
};

export default ErrorMessage;
