/*eslint-disable react-hooks/exhaustive-deps */

// libraries
import {
  createContext,
  useEffect,
  useState,
} from "react";
import PropTypes from "prop-types";

// statics
import ALGORITHM from "../data/algorithm";
import SPEED from "../data/speed";
import LENGTH from "../data/length";
import MIN from "../data/min";
import MAX from "../data/max";

// utils
import generateUnsortedArray from "../utils/generateUnsortedArray";

// context
export const AppContext = createContext();

// context provider
const AppContextProvider = ({ children }) => {
  // states

  // settings states
  const [algorithmIndex, setAlgorithmIndex] =
    useState(0);
  const [speedIndex, setSpeedIndex] = useState(3);
  const [lengthIndex, setLengthIndex] =
    useState(6);
  const [minIndex, setMinIndex] = useState(1);
  const [maxIndex, setMaxIndex] = useState(10);

  const [algorithm, setAlgorithm] = useState(
    ALGORITHM[algorithmIndex].value
  );
  const [speed, setSpeed] = useState(
    SPEED[speedIndex].value
  );
  const [length, setLength] = useState(
    LENGTH[lengthIndex].value
  );
  const [min, setMin] = useState(
    MIN[minIndex].value
  );
  const [max, setMax] = useState(
    MAX[maxIndex].value
  );

  const [showSettings, setShowSettings] =
    useState(false);

  // render states
  const [unsortedPrimary, setUnsortedPrimary] =
    useState([]);
  const [sortedPrimary, setSortedPrimary] =
    useState([]);

  // settings handlers

  // set algorithm index if in range
  const updateAlgorithmIndex = (index) => {
    if (index >= 0 && index < ALGORITHM.length) {
      setAlgorithmIndex(() => index);
    }
  };

  // set speed index if in range
  const updateSpeedIndex = (index) => {
    if (index >= 0 && index < SPEED.length) {
      setSpeedIndex(() => index);
    }
  };

  // set length index if in range
  const updateLengthIndex = (index) => {
    if (index >= 0 && index < LENGTH.length) {
      setLengthIndex(() => index);
    }
  };

  // set min index if in range and min is less than max
  const updateMinIndex = (index) => {
    if (
      index >= 0 &&
      index < MIN.length &&
      MIN[index].value < max
    ) {
      setMinIndex(() => index);
    }
  };

  // set max index if in range and max is greater than min
  const updateMaxIndex = (index) => {
    if (
      index >= 0 &&
      index < MAX.length &&
      MAX[index].value > min
    ) {
      setMaxIndex(() => index);
    }
  };

  // toggle settings display
  const toggleShowSettings = () => {
    setShowSettings(
      (prevShowSettings) => !prevShowSettings
    );
  };

  // set algorithm when algorithm index changes
  useEffect(() => {
    setAlgorithm(
      () => ALGORITHM[algorithmIndex].value
    );
  }, [algorithmIndex]);

  // set speed when speed index changes
  useEffect(() => {
    setSpeed(() => SPEED[speedIndex].value);
  }, [speedIndex]);

  // set length when length index changes
  useEffect(() => {
    setLength(() => LENGTH[lengthIndex].value);
  }, [lengthIndex]);

  // set min when min index changes
  useEffect(() => {
    setMin(() => MIN[minIndex].value);
  }, [minIndex]);

  // set max when max index changes
  useEffect(() => {
    setMax(() => MAX[maxIndex].value);
  }, [maxIndex]);

  // render handlers

  // generate unsorted primary array
  const generateUnsortedPrimary = () => {
    setUnsortedPrimary(() =>
      generateUnsortedArray(length, min, max)
    );
  };

  // reset sorted primary array to unsorted primary array
  const resetSortedPrimary = () => {
    setSortedPrimary(() => [...unsortedPrimary]);
  };

  // reset sorted primary array
  const reset = () => {
    resetSortedPrimary();
  };

  // generate unsorted primary array
  const shuffle = () => {
    generateUnsortedPrimary();
  };

  // update sorted primary array
  // when unsorted primary array changes
  useEffect(() => {
    resetSortedPrimary();
  }, [unsortedPrimary]);

  // reset sorted primary array
  // when algorithm changes
  useEffect(() => {
    resetSortedPrimary();
  }, [algorithm]);

  // generate unsorted primary array
  // when length / min / max changes
  useEffect(() => {
    shuffle();
  }, [length, min, max]);

  return (
    <AppContext.Provider
      value={{
        settings: {
          index: {
            algorithm: algorithmIndex,
            speed: speedIndex,
            length: lengthIndex,
            min: minIndex,
            max: maxIndex,
          },
          indexHandler: {
            algorithm: updateAlgorithmIndex,
            speed: updateSpeedIndex,
            length: updateLengthIndex,
            min: updateMinIndex,
            max: updateMaxIndex,
          },
          value: {
            algorithm,
            speed,
            length,
            min,
            max,
            showSettings,
          },
          handler: {
            toggleShowSettings,
          },
        },
        render: {
          value: {
            sortedPrimary,
          },
          handler: {
            reset,
            shuffle,
          },
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.any,
};

export default AppContextProvider;
