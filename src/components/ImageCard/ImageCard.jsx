import React from 'react';
import styles from './ImageCard.module.css';

const ImageCard = ({ image, onClick }) => {
  return (
    <div>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        onClick={() => onClick(image)} 
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};

export default ImageCard;

