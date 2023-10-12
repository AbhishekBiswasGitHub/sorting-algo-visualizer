import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import ArrayViz from "./ArrayViz";

const AuxiliaryArray = () => {
  const {
    settings: {
      value: { algorithm, min, max },
    },
    render: {
      value: { sortedPrimary, sortedAuxiliary },
    },
  } = useContext(AppContext);
  return sortedAuxiliary.length ? (
    <ArrayViz
      min={algorithm === "countingSort" ? 0 : min}
      max={
        algorithm === "countingSort"
          ? Math.floor(sortedPrimary.length / 1.5)
          : max
      }
      array={sortedAuxiliary}
    />
  ) : (
    <></>
  );
};

export default AuxiliaryArray;
