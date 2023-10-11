import { useContext } from "react";

import SPEED from "../data/speed";
import LENGTH from "../data/length";
import MIN from "../data/min";
import MAX from "../data/max";

import { AppContext } from "../contexts/AppContext";

import Range from "./Range";

import styles from "./settings.module.css";

const Settings = () => {
  const {
    settings: { index, indexHandler, value },
  } = useContext(AppContext);

  return (
    <div
      className={styles.container}
      style={
        value.showSettings
          ? { display: "flex" }
          : {}
      }
    >
      <div className={styles.settings}>
        <Range
          title="algorithm"
          icon="microchip"
          values={[{ title: "selection sort" }]}
          index={0}
          setIndex={() => {}}
        />
        <Range
          title="speed"
          icon="gauge-simple-high"
          values={SPEED}
          index={index.speed}
          setIndex={indexHandler.speed}
        />
        <Range
          title="number of elements"
          icon="bars"
          values={LENGTH}
          index={index.length}
          setIndex={indexHandler.length}
        />
        <Range
          title="minimum value of elements"
          icon="angle-down"
          values={MIN}
          index={index.min}
          setIndex={indexHandler.min}
        />
        <Range
          title="maximum value of elements"
          icon="angle-up"
          values={MAX}
          index={index.max}
          setIndex={indexHandler.max}
        />
      </div>
    </div>
  );
};

export default Settings;
