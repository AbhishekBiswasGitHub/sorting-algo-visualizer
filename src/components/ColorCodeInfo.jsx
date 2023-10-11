import { useState } from "react";

import STATUS from "../data/status";
const {
  UNSORTED,
  SORTED,
  ACTIVE,
  LESS,
  GREATER,
} = STATUS;

import styles from "./color-code-info.module.css";

const ColorCodeInfo = () => {
  const [showInfo, setShowInfo] = useState(false);

  const toggleShowInfo = () => {
    setShowInfo((prevShowInfo) => !prevShowInfo);
  };

  return (
    <>
      <div
        className={styles.container}
        onClick={toggleShowInfo}
      >
        <i className="fa-solid fa-circle-info"></i>
      </div>
      <div
        className={styles["info-container"]}
        style={
          showInfo ? { display: "flex" } : {}
        }
      >
        <div className={styles.infos}>
          <div className={styles.info}>
            <div
              style={{
                backgroundColor: UNSORTED,
              }}
            ></div>
            <span style={{ color: UNSORTED }}>
              unsorted
            </span>
          </div>
          <div className={styles.info}>
            <div
              style={{
                backgroundColor: SORTED,
              }}
            ></div>
            <span style={{ color: SORTED }}>
              sorted
            </span>
          </div>
          <div className={styles.info}>
            <div
              style={{
                backgroundColor: ACTIVE,
              }}
            ></div>
            <span style={{ color: ACTIVE }}>
              selected
            </span>
          </div>
          <div className={styles.info}>
            <div
              style={{
                backgroundColor: LESS,
              }}
            ></div>
            <span style={{ color: LESS }}>
              less
            </span>
          </div>
          <div className={styles.info}>
            <div
              style={{
                backgroundColor: GREATER,
              }}
            ></div>
            <span style={{ color: GREATER }}>
              greater
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ColorCodeInfo;
