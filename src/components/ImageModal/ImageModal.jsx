// src/components/ImageModal/ImageModal.jsx
import React, { useEffect } from 'react';
import Modal from 'react-modal'; // Импортируем React Modal
import styles from './ImageModal.module.css';

const ImageModal = ({ isOpen, onClose, image }) => {
  // Закрытие модального окна при нажатии клавиши ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!image) return null; // Если нет изображения, ничего не показываем

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose} // Закрытие модалки по клику на overlay
      className={styles.modalContent}
      overlayClassName={styles.overlay}
      closeTimeoutMS={200} // Мягкое закрытие
    >
      <div className={styles.modalWrapper}>
        <img src={image.urls.regular} alt={image.alt_description} />
        <div className={styles.info}>
          <p>Author: {image.user.name}</p>
          <p>Likes: {image.likes}</p>
          <p>{image.alt_description || 'No description available'}</p>
        </div>
      </div>
    </Modal>
  );
};

export default ImageModal;
