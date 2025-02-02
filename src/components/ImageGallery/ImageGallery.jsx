// src/components/ImageGallery/ImageGallery.jsx
import React from 'react';
import ImageCard from '../ImageCard/ImageCard'; // Импортируем компонент ImageCard
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images }) => {
  if (images.length === 0) {
    return <p>No images found. Please search again.</p>; // Сообщение, если нет изображений
  }

  return (
    <ul className={styles.gallery}>
      {images.map((image) => (
        <li key={image.id} className={styles.item}>
          <ImageCard image={image} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
