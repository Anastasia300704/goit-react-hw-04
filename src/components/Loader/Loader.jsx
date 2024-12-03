import React from 'react';
import { TailSpin } from 'react-loader-spinner';
import styles from './Loader.module.css';

const Loader = () => (
  <div className={styles.loader}>
    <TailSpin height="80" width="80" color="#00bfff" />
  </div>
);

export default Loader;
