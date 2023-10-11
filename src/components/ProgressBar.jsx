import STATUS from "../data/status";
const { UNSORTED, SORTED } = STATUS;

import styles from "./progress-bar.module.css";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const ProgressBar = () => {
  const {
    render: {
      value: { progress },
    },
  } = useContext(AppContext);
  return (
    <div
      className={styles.container}
      style={{ backgroundColor: UNSORTED }}
    >
      <div
        className={styles.progress}
        style={{
          backgroundColor: SORTED,
          width: `${progress}%`,
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
