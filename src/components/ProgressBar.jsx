import PropTypes from "prop-types";

import STATUS from "../data/status";
const { UNSORTED, SORTED } = STATUS;

import styles from "./progress-bar.module.css";

const ProgressBar = ({ progress }) => {
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

ProgressBar.propTypes = {
  progress: PropTypes.any.isRequired,
};

export default ProgressBar;
