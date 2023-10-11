import PropTypes from "prop-types";

import styles from "./array-viz.module.css";

const ArrayViz = ({ min, max, array }) => {
  return (
    <div className={styles.container}>
      <div className={styles.visualizer}>
        <div
          className={styles.positive}
          style={{
            height:
              max > 0
                ? `${
                    (max /
                      (max - Math.min(0, min))) *
                    100
                  }%`
                : 0,
          }}
        >
          {array.map(({ value, status }, i) => (
            <div
              key={i}
              className={styles.item}
              style={{
                opacity: value > 0 ? 1 : 0,
                width: `clamp(5px, calc(100vw / ${
                  array.length * 1.5
                }), 10px)`,
                height:
                  value >= 0
                    ? `${(value / max) * 100}%`
                    : 0,
                backgroundColor: status,
              }}
            ></div>
          ))}
        </div>
        <div
          className={styles.negative}
          style={{
            height:
              min < 0
                ? `${
                    (min /
                      (Math.max(0, max) - min)) *
                    -100
                  }%`
                : 0,
          }}
        >
          {array.map(({ value, status }, i) => (
            <div
              key={i}
              className={styles.item}
              style={{
                opacity: value < 0 ? 1 : 0,
                width: `clamp(5px, calc(100vw / ${
                  array.length * 1.5
                }), 10px)`,
                height:
                  value < 0
                    ? `${(value / min) * 100}%`
                    : 0,
                backgroundColor: status,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

ArrayViz.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  array: PropTypes.array.isRequired,
};

export default ArrayViz;
