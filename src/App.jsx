import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import axios from 'axios';

const API_KEY = 'c9NvrA2EJhiEEBfeAI9PnJ8_cT1yI97cO19-DWOBDTk';
const BASE_URL = 'https://unsplash.com/oauth/applications/682578';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchImages = async (newQuery, newPage = 1) => {
    if (!newQuery) {
      toast.error('Please enter a search query!');
      return;
    }
    setIsLoading(true);

    try {
      const response = await axios.get(BASE_URL, {
        params: {
          query: newQuery,
          page: newPage,
          per_page: 12,
        },
        headers: {
          Authorization: `Client-ID ${c9NvrA2EJhiEEBfeAI9PnJ8_cT1yI97cO19-DWOBDTk}`,
        },
      });

      const newImages = response.data.results;
      setImages(newPage === 1 ? newImages : [...images, ...newImages]);
      setPage(newPage);
      setQuery(newQuery);
    } catch (error) {
      toast.error('Failed to fetch images!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <div>
      <Toaster />
      <SearchBar onSubmit={fetchImages} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isLoading && <Loader />}
      {images.length > 0 && <LoadMoreBtn onClick={() => fetchImages(query, page + 1)} />}
      {showModal && <ImageModal image={selectedImage} onClose={closeModal} />}
    </div>
  );
};

export default App;
