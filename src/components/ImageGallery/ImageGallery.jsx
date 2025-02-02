import React from 'react';
import ImageCard from '../ImageCard/ImageCard'; 
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul>
      {images.map((image) => (
        <li key={image.id}>
          <ImageCard image={image} onClick={onImageClick} /> 
          {/* Передаем обработчик клика в ImageCard */}
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
