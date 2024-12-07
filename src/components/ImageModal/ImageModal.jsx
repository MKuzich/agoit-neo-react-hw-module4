import { useEffect } from "react";
import css from "./ImageModal.module.css";
import Modal from "react-modal";

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
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      className={css.modal}
      overlayClassName={css.backdrop}
      onClick={onBackprodClick}
      ariaHideApp={false}
    >
      <img src={regular} alt={alt_description} className={css.image} />
    </Modal>
  );
};

export default ImageModal;
