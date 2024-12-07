import { useEffect, useState } from "react";
import "./App.css";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import SearchBar from "./components/SearchBar/SearchBar";
import { Toaster } from "react-hot-toast";
import { getImages, getImagesByQuery } from "./services/images";
import toast from "react-hot-toast";
import Loader from "./components/Loader/Loader";
import ErrorMassage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLastPage, setIsLastPage] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getImages(page)
      .then((data) => {
        setImages(data.data);
        if (data.data.length > 0) {
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
  }, []);

  useEffect(() => {
    window.scrollBy({
      top: 680,
      left: 0,
      behavior: "smooth",
    });
  }, [images]);

  const loadMore = () => {
    setIsLoading(true);
    const nextPage = page + 1;

    if (!query) {
      getImages(nextPage)
        .then((data) => {
          setImages((prevImages) => [...prevImages, ...data.data]);
          setIsLastPage(data.data.length < 8);
          setPage(nextPage);
          setError(null);
        })
        .catch((error) => {
          setError(error);
          setImages([]);
          toast.error(error.message);
        })
        .finally(() => setIsLoading(false));
    } else {
      getImagesByQuery(query, nextPage)
        .then((data) => {
          setImages((prevImages) => [...prevImages, ...data.data.results]);
          setIsLastPage(data.data.total_pages === nextPage);
          setPage(nextPage);
          setError(null);
        })
        .catch((error) => {
          setError(error);
          setImages([]);
          toast.error(error.message);
        })
        .finally(() => setIsLoading(false));
    }
  };

  const handleSearch = (query) => {
    setQuery(query.trim());
    setIsLoading(true);
    getImagesByQuery(query, 1)
      .then((data) => {
        setImages(data.data.results);
        setIsLastPage(data.data.total_pages === 1);
        setPage(1);
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
