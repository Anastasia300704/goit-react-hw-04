import React from 'react';
import ImageCard from '../ImageCard/ImageCard';

const ImageGallery = ({ images }) => {
  if (!images.length) {
    return <p>No images found</p>;
  }

  return (
    <div className="image-gallery">
      {images.map((image) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </div>
  );
};

export default ImageGallery;