import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

  const fetchImages = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(BASE_URL, {
        params: {
          key: API_KEY,
          q: query,
          image_type: 'photo',
          per_page: 12,
        },
      });

      if (response.data.hits.length === 0) {
        toast.error('No images found!');
      } else {
        setImages(response.data.hits);
      }
    } catch (err) {
      setError('Something went wrong! Please try again.');
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
    {error && <p className="ErrorMessage">{error}</p>}
    <ImageGallery images={images} />
    <ToastContainer /> {/* Додаємо контейнер для тостів */}
  </div>
);

};

export default App;
