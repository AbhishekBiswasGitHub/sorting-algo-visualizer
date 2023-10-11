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
          values={[{ title: "normal" }]}
          index={0}
          setIndex={() => {}}
        />
        <Range
          title="number of elements"
          icon="bars"
          values={[{ title: "50" }]}
          index={0}
          setIndex={() => {}}
        />
        <Range
          title="minimum value of elements"
          icon="angle-down"
          values={[{ title: "0" }]}
          index={0}
          setIndex={() => {}}
        />
        <Range
          title="maximum value of elements"
          icon="angle-up"
          values={[{ title: "50" }]}
          index={0}
          setIndex={() => {}}
        />
      </div>
    </div>
  );
};

export default Settings;
