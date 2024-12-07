import { useEffect, useState } from "react";
import "./App.css";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import SearchBar from "./components/SearchBar/SearchBar";
import { Toaster } from "react-hot-toast";
import { getImages } from "./services/images";
import toast from "react-hot-toast";
import Loader from "./components/Loader/Loader";
import ErrorMassage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("dog");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLastPage, setIsLastPage] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getImages(query, page)
      .then((data) => {
        setImages([...images, ...data.data.results]);
        setIsLastPage(data.data.total_pages === 1);
        if (data.data.results.length > 0) {
          setError(null);
        } else {
          setError(new Error("No images found"));
        }
      })
      .catch((error) => {
        setError(error);
        setImages([]);
        toast.error(error.message);
      })
      .finally(() => setIsLoading(false));
  }, [query, page]);

  useEffect(() => {
    window.scrollBy({
      top: 680,
      left: 0,
      behavior: "smooth",
    });
  }, [images]);

  const loadMore = () => {
    setPage(page + 1);
  };

  const handleSearch = (newQuery) => {
    if (newQuery.trim() === query) {
      setPage(page + 1);
    } else {
      setImages([]);
      setPage(1);
      setQuery(newQuery.trim());
    }
  };

  const openModal = (data) => {
    setModalData(data);
  };

  const closeModal = () => {
    setModalData(null);
  };

  return (
    <>
      <Toaster position="bottom-right" />
      <SearchBar onSubmit={handleSearch} />
      {images.length > 0 && !error && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {!isLoading && !isLastPage && images.length > 0 && !error && (
        <LoadMoreBtn loadMore={loadMore} />
      )}
      {isLoading && <Loader isFull={images.length === 0} />}
      {!isLoading && error && <ErrorMassage message={error.message} />}
      {modalData && <ImageModal closeModal={closeModal} data={modalData} />}
    </>
  );
}

export default App;
