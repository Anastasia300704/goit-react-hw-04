import React from 'react';
import Modal from 'react-modal';
import styles from './ImageModal.module.css';

Modal.setAppElement('#root');

const ImageModal = ({ image, onClose }) => (
  <Modal
    isOpen={!!image}
    onRequestClose={onClose}
    className={styles.modal}
    overlayClassName={styles.overlay}
  >
    <img src={image?.urls.regular} alt={image?.alt_description} />
    <p>Author: {image?.user.name}</p>
    <p>Likes: {image?.likes}</p>
    <p>Description: {image?.alt_description || 'No description'}</p>
    <button onClick={onClose}>Close</button>
  </Modal>
);

export default ImageModal;
