import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import ArrayViz from "./ArrayViz";

const AuxiliaryArray = () => {
  const {
    settings: {
      value: { min, max },
    },
    render: {
      value: { sortedAuxiliary },
    },
  } = useContext(AppContext);
  return sortedAuxiliary.length ? (
    <ArrayViz
      min={min}
      max={max}
      array={sortedAuxiliary}
    />
  ) : (
    <></>
  );
};

export default AuxiliaryArray;
