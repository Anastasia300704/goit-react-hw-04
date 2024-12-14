// src/components/ImageCard/ImageCard.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ImageCard.module.css';
import ImageModal from '../ImageModal/ImageModal';

const ImageCard = ({ imageUrl, alt }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <div className={styles.card}>
      <img
        src={imageUrl}
        alt={alt || 'Image'}
        className={styles.image}
        onClick={handleOpenModal}
      />
      {isModalOpen && <ImageModal imageUrl={imageUrl} alt={alt} onClose={handleCloseModal} />}
    </div>
  );
};

ImageCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

export default ImageCard;
