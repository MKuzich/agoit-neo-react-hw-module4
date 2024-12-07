import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={css.list}>
      {images.map((image) => (
        <li key={image.id} onClick={() => openModal(image)}>
          <ImageCard data={image} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
