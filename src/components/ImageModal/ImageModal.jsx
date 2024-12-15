import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import css from './ImageModal.module.css';

ReactModal.setAppElement('#root');

const ImageModal = ({ isOpen, onRequestClose, imageUrl, alt }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Image Modal"
      overlayClassName={css.overlay}
      className={css.modal}
    >
      <img src={imageUrl} alt={alt} />
    </ReactModal>
  );
};

ImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ImageModal;
