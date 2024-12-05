import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';

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

const fetchImages = async (query, page) => {
  try {
    setIsLoading(true);
    setError(null); 
    const response = await fetch(
      `${BASE_URL}/search/photos?query=${query}&page=${page}&client_id=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch images");
    }
    const data = await response.json();
    setImages((prevImages) => [...prevImages, ...data.results]);
  } catch (err) {
    setError(err.message);
    toast.error("Something went wrong! Please try again.");
  } finally {
    setIsLoading(false);
  }
};


    fetchImages();
  }, [query, page]);

    const handleSearch = (searchQuery) => {
   setQuery(searchQuery);
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
      {selectedImage && <ImageModal image={selectedImage} onClose={closeModal} />}
    </div>
  );
};

export default App;
