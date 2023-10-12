import { useContext } from "react";

import { AppContext } from "../contexts/AppContext";

import styles from "./full-screen.module.css";

const FullScreen = () => {
  const {
    settings: {
      value: { isFullScreen },
      handler: { toggleFullScreen },
    },
  } = useContext(AppContext);

  return (
    <div
      className={styles.container}
      onClick={toggleFullScreen}
    >
      {isFullScreen ? (
        <i className="fa-solid fa-down-left-and-up-right-to-center"></i>
      ) : (
        <i className="fa-solid fa-up-right-and-down-left-from-center"></i>
      )}
    </div>
  );
};

export default FullScreen;
