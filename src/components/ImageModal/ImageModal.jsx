import { useEffect } from "react";
import css from "./ImageModal.module.css";

const ImageModal = ({
  closeModal,
  data: {
    alt_description,
    urls: { regular },
  },
}) => {
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.code === "Escape") {
        closeModal();
      }
    });
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", (e) => {
        if (e.code === "Escape") {
          closeModal();
        }
      });
      document.body.style.overflow = "auto";
    };
  }, [closeModal]);

  const onBackprodClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  return (
    <div className={css.backdrop} onClick={onBackprodClick}>
      <div className={css.modal}>
        <img src={regular} alt={alt_description} className={css.image} />
      </div>
    </div>
  );
};

export default ImageModal;
