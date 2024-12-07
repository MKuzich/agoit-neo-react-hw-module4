import css from "./Loader.module.css";
import { FallingLines } from "react-loader-spinner";

const Loader = ({ isFull }) => {
  return (
    <div className={isFull ? css.fullWrapper : css.wrapper}>
      <FallingLines
        color="#535bf2"
        width="100"
        visible={true}
        ariaLabel="falling-circles-loading"
      />
    </div>
  );
};

export default Loader;
