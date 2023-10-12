import { useContext } from "react";

import { AppContext } from "../contexts/AppContext";

import styles from "./random.module.css";

const Random = () => {
  const {
    settings: {
      value: { isLoopingRandomly },
      handler: { toggleLoopingRandomly },
    },
  } = useContext(AppContext);

  return (
    <div
      className={styles.container}
      onClick={toggleLoopingRandomly}
    >
      {isLoopingRandomly ? (
        <i className="fa-solid fa-stop"></i>
      ) : (
        <i className="fa-solid fa-dice"></i>
      )}
    </div>
  );
};

export default Random;
