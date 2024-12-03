import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = 'https://api.unsplash.com/';
const API_KEY = 'c9NvrA2EJhiEEBfeAI9PnJ8_cT1yI97cO19-DWOBDTk';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const handleLoadMore = () => {
  fetchImages(query, page + 1); 
  setPage((prevPage) => prevPage + 1); 
};



const fetchImages = async (newQuery, newPage = 1) => {
  setIsLoading(true);

  try {
    const response = await axios.get(`${BASE_URL}/search/photos`, {
      params: {
        query: newQuery, // Параметр для пошуку
        page: newPage,   // Номер сторінки
        per_page: 12,    // Кількість зображень на сторінку
      },
      headers: {
        Authorization: `Client-ID ${API_KEY}`, // Ваш ключ API
      },
    });

    if (response.data.results.length === 0) {
      throw new Error('No images found for your query.');
    }

    setImages((prevImages) => [...prevImages, ...response.data.results]); // Додаємо нові зображення до старих
    setError(null); // Очищаємо помилку
  } catch (err) {
    setError(err.message); // Записуємо повідомлення про помилку
    toast.error('Something went wrong! Please try again.');
  } finally {
    setIsLoading(false);
  }
};


  useEffect(() => {
    if (query !== '') {
      fetchImages();
    }
  }, [query]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setImages([]); // Очистити попередні результати
  };

  return (
  <div className="App">
    <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
    {error && <p className="ErrorMessage">{error}</p>}
      <ImageGallery images={images} />
      {images.length > 0 && !isLoading && <LoadMoreBtn onClick={handleLoadMore} />}

    <ToastContainer /> {/* Додаємо контейнер для тостів */}
  </div>
);

};

export default App;
