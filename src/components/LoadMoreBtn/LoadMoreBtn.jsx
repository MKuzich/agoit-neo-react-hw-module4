import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ loadMore }) => {
  return (
    <div className={css.wrap}>
      <button onClick={loadMore}>Load More</button>
    </div>
  );
};

export default LoadMoreBtn;
