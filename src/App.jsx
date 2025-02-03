import React, { useState, useEffect } from 'react';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageModal from './components/ImageModal/ImageModal';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import SearchBar from './components/SearchBar/SearchBar';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const App = () => {
  const [images, setImages] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const apiKey = '3PbS8YVQfqwalQib-p3agk5DXvxvvO977_I9zHKXEiE'; 

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    setError(null);

    axios
      .get(
        `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=12&client_id=${apiKey}`
      )
      .then((response) => {
        const fetchedImages = response.data.results;
        setImages((prevImages) => [...prevImages, ...fetchedImages]);
        setTotalPages(Math.ceil(response.data.total / 12));
      })
      .catch((err) => {
        setError('Ошибка загрузки изображений');
        toast.error('Ошибка загрузки изображений');
      })
      .finally(() => setLoading(false));
  }, [query, page]);

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  const handleSearchSubmit = (searchQuery) => {
    if (searchQuery.trim() === '') {
      toast.error('Пожалуйста, введите текст для поиска!');
      return;
    }
    setQuery(searchQuery);
    setImages([]);
    setPage(1);
  };


  const loadMoreImages = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <ErrorMessage message={error} />}
      {loading && !images.length && <Loader />}
      {!loading && images.length === 0 && !error && <p>Ничего не найдено.</p>}

      <ImageGallery images={images} onImageClick={openModal} />
      
      {images.length > 0 && page < totalPages && (
        <LoadMoreBtn onClick={loadMoreImages} />
      )}

      <ImageModal isOpen={modalIsOpen} onClose={closeModal} image={selectedImage} />
    </div>
  );
};

export default App;
