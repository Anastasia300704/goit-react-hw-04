// src/components/Loader/Loader.jsx
import React from 'react';
import { ThreeDots } from 'react-loader-spinner'; // Импортируем компонент ThreeDots для индикатора загрузки
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <ThreeDots color="#00BFFF" height={80} width={80} />
    </div>
  );
};

export default Loader;
