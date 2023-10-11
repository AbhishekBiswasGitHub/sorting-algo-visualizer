// libraries
import {
  createContext,
  useEffect,
  useState,
} from "react";
import PropTypes from "prop-types";

// statics
import SPEED from "../data/speed";
import LENGTH from "../data/length";
import MIN from "../data/min";
import MAX from "../data/max";

// context
export const AppContext = createContext();

// context provider
const AppContextProvider = ({ children }) => {
  // settings states
  const [speedIndex, setSpeedIndex] = useState(3);
  const [lengthIndex, setLengthIndex] =
    useState(6);
  const [minIndex, setMinIndex] = useState(1);
  const [maxIndex, setMaxIndex] = useState(10);

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

  // settings handlers

  // TODO: set algorithm index if in range

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

  // TODO: set algorithm when algorithm index changes

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

  return (
    <AppContext.Provider
      value={{
        settings: {
          index: {
            // TODO: algorithm
            speed: speedIndex,
            length: lengthIndex,
            min: minIndex,
            max: maxIndex,
          },
          indexHandler: {
            // TODO: algorithm
            speed: updateSpeedIndex,
            length: updateLengthIndex,
            min: updateMinIndex,
            max: updateMaxIndex,
          },
          value: {
            // TODO: algorithm
            speed,
            length,
            min,
            max,
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
