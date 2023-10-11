import { useContext } from "react";

import ALGORITHM from "../data/algorithm";

import { AppContext } from "../contexts/AppContext";

import Range from "./Range";

// import titleCaseFromCamelCase from "../utils/titleCaseFromCamelCase";

import styles from "./title.module.css";

const Title = () => {
  const {
    settings: { index, indexHandler },
  } = useContext(AppContext);

  return (
    <div className={styles.container}>
      <Range
        title=""
        icon=""
        values={ALGORITHM}
        index={index.algorithm}
        setIndex={indexHandler.algorithm}
      />
      {/* <span>
        {titleCaseFromCamelCase(algorithm)}
      </span> */}
    </div>
  );
};

export default Title;
