import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import Loader from "./components/Loader/Loader";
import ImageModal from "./components/ImageModal/ImageModal";


function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!query) return;

    setIsLoading(true);
    fetchImages(query, page)
      .then((data) => {
        setImages((prev) => [...prev, ...data.results]);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, [query, page]);

  const handleSearch = (searchTerm) => {
    console.log("Searching for:", searchTerm);
    setQuery(searchTerm);
  };

  return (
    <div>
       <SearchBar onSearch={handleSearch} />
      <ImageGallery
        images={images}
        onImageClick={(image) => setSelectedImage(image)}
      />
      {isLoading && <Loader />}
      {images.length > 0 && <LoadMoreBtn onClick={() => setPage((p) => p + 1)} />}
      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          image={selectedImage}
        />
      )}
    </div>
  );
}

export default App;
