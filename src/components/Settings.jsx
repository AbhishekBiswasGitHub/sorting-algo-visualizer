import SPEED from "../data/speed";
import LENGTH from "../data/length";
import MIN from "../data/min";
import MAX from "../data/max";

import Range from "./Range";

import styles from "./settings.module.css";

const Settings = () => {
  return (
    <div className={styles.container}>
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
          index={0}
          setIndex={() => {}}
        />
        <Range
          title="number of elements"
          icon="bars"
          values={LENGTH}
          index={0}
          setIndex={() => {}}
        />
        <Range
          title="minimum value of elements"
          icon="angle-down"
          values={MIN}
          index={0}
          setIndex={() => {}}
        />
        <Range
          title="maximum value of elements"
          icon="angle-up"
          values={MAX}
          index={0}
          setIndex={() => {}}
        />
      </div>
    </div>
  );
};

export default Settings;
