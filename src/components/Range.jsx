import PropTypes from "prop-types";

import styles from "./range.module.css";

const Range = ({
  title,
  icon,
  values,
  index,
  setIndex,
}) => {
  const handleDecrement = () => {
    setIndex(index - 1);
  };
  const handleIncrement = () => {
    setIndex(index + 1);
  };

  return (
    <div className={styles.container}>
      {title ? (
        <span className={styles.title}>
          {icon ? (
            <i
              className={`fa-solid fa-${icon}`}
            ></i>
          ) : (
            <></>
          )}
          {title}
        </span>
      ) : (
        <></>
      )}
      <div className={styles.display}>
        <span
          className={`${styles.button} ${styles.decrement}`}
          onClick={handleDecrement}
        >
          <i className="fa-solid fa-caret-left"></i>
        </span>
        <span className={styles.value}>
          {values[index].title}
        </span>
        <span
          className={`${styles.button} ${styles.increment}`}
          onClick={handleIncrement}
        >
          <i className="fa-solid fa-caret-right"></i>
        </span>
      </div>
    </div>
  );
};

Range.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  setIndex: PropTypes.func.isRequired,
};

export default Range;
