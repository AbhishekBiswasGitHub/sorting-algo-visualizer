import { useContext } from "react";

import { AppContext } from "../contexts/AppContext";

import ArrayViz from "./ArrayViz";

const PrimaryArray = () => {
  const {
    settings: {
      value: { min, max },
    },
    render: {
      value: { sortedPrimary },
    },
  } = useContext(AppContext);
  return (
    <ArrayViz
      min={min}
      max={max}
      array={sortedPrimary}
    />
  );
};

export default PrimaryArray;
