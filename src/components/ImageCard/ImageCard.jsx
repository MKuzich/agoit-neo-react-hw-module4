import css from "./ImageCard.module.css";

const ImageCard = ({
  data: {
    alt_description,
    urls: { small },
  },
}) => {
  return (
    <div className={css.card}>
      <img src={small} alt={alt_description} className={css.img} />
    </div>
  );
};

export default ImageCard;
