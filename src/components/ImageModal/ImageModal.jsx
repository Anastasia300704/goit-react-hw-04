import React from 'react';
import Modal from 'react-modal';

const ImageModal = ({ isOpen, onClose, image }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="overlay"
      ariaHideApp={false}
    >
      <button onClick={onClose} className="close-button">Close</button>
      <img src={image?.regular} alt={image?.description} />
      <p>{image?.description}</p>
      <p>Author: {image?.user?.name}</p>
    </Modal>
  );
};

export default ImageModal;

