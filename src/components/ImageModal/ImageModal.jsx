// src/components/ImageModal/ImageModal.jsx
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './ImageModal.module.css';

const ImageModal = ({ imageUrl, alt, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <img src={imageUrl} alt={alt} />
      </div>
    </div>
  );
};

ImageModal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  alt: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default ImageModal;
