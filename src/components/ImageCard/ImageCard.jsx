import React from 'react';
import PropTypes from 'prop-types';

const ImageCard = ({ webformatURL, tags, onClick }) => {
  return (
    <div className="ImageCard">
      <img
        src={webformatURL}
        alt={tags}
        className="ImageCard-image"
        onClick={onClick}
      />
    </div>
  );
};

ImageCard.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageCard;
