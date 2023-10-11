import { useContext } from "react";

import { AppContext } from "../contexts/AppContext.jsx";

import styles from "./controls.module.css";

const Controls = () => {
  const {
    settings: { handler },
  } = useContext(AppContext);

  return (
    <div className={styles.container}>
      <div
        className={styles.button}
        title="Settings"
        onClick={handler.toggleShowSettings}
        style={{ marginLeft: 0 }}
      >
        <i className="fa-solid fa-gears"></i>
      </div>
      <div className={styles.controls}>
        <div
          className={styles.button}
          title="Sort"
          onClick={() => {}}
        >
          <i className="fa-solid fa-arrow-up-wide-short"></i>
        </div>
        <div
          className={styles.button}
          title="Reset"
          onClick={() => {}}
        >
          <i className="fa-solid fa-rotate-left"></i>
        </div>
        <div
          className={styles.button}
          title="Shuffle"
          onClick={() => {}}
        >
          <i className="fa-solid fa-shuffle"></i>
        </div>
      </div>
    </div>
  );
};

export default Controls;
