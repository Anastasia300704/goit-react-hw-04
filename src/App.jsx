import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import { fetchImages } from './services/api';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const handleSearch = newQuery => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setHasMore(true);
  };

  const loadMore = () => setPage(prevPage => prevPage + 1);

  const openModal = (imageUrl, alt) => {
    setModalImage({ imageUrl, alt });
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setLoading(true);
      setError('');

      try {
        const { hits, totalHits } = await fetchImages(query, page);
        setImages(prevImages => [...prevImages, ...hits]);
        setHasMore(page < Math.ceil(totalHits / 12));
      } catch (err) {
        setError('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, page]);

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={openModal} />
      {loading && <Loader />}
      {hasMore && !loading && images.length > 0 && (
        <LoadMoreBtn onClick={loadMore} />
      )}
      {showModal && (
        <ImageModal
          isOpen={showModal}
          onRequestClose={closeModal}
          imageUrl={modalImage.imageUrl}
          alt={modalImage.alt}
        />
      )}
    </div>
  );
};

export default App;
