import { useContext } from "react";

import { AppContext } from "../contexts/AppContext";

import titleCaseFromCamelCase from "../utils/titleCaseFromCamelCase";

import styles from "./title.module.css";

const Title = () => {
  const {
    settings: {
      value: { algorithm },
    },
  } = useContext(AppContext);

  return (
    <div className={styles.container}>
      <span>
        {titleCaseFromCamelCase(algorithm)}
      </span>
    </div>
  );
};

export default Title;
