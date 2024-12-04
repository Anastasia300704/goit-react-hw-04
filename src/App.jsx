import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import axios from 'axios';

const BASE_URL = 'https://api.unsplash.com';
const API_KEY = 'c9NvrA2EJhiEEBfeAI9PnJ8_cT1yI97cO19-DWOBDTk';


const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!query) return;

const fetchImages = async () => {
  try {
    const response = await fetch(`${BASE_URL}/search/photos?query=${query}&page=${page}&client_id=${API_KEY}`);
    const data = await response.json();
    setImages(data.results || []); 
  } catch (error) {
    console.error('Error fetching images:', error);
  }
};

    fetchImages();
  }, [query, page]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const closeModal = () => setSelectedImage(null);

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={setSelectedImage} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && <LoadMoreBtn onClick={handleLoadMore} />}
      {images && images.length > 0 && (images.map((image) => (<ImageCard key={image.id} {...image} />)))}
      {selectedImage && <ImageModal image={selectedImage} onClose={closeModal} />}
    </div>
  );
};

export default App;
