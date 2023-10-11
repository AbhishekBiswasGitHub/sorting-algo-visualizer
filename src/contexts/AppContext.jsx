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
import createRender from "../utils/createRender";

// algorithms
import algorithms from "../algorithms/algorithms";

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
  const [isRendering, setIsRendering] =
    useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [unsortedPrimary, setUnsortedPrimary] =
    useState([]);
  const [sortedPrimary, setSortedPrimary] =
    useState([]);
  const [renders, setRenders] = useState([]);
  const [renderIndex, setRenderIndex] =
    useState(0);

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

  // reset rendering flags
  const resetFlags = () => {
    setIsRendering(() => false);
    setIsPaused(() => false);
    setRenderIndex(() => 0);
  };

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

  // generate renders array
  const generateRenders = () => {
    setRenders(() =>
      algorithms[algorithm](
        unsortedPrimary,
        createRender(setSortedPrimary)
      )
    );
  };

  // start sorting if not, pause if sorting
  const sort = () => {
    if (!isRendering) {
      if (!isPaused) {
        setRenderIndex(() => 0);
      }

      setIsRendering(true);
      setIsPaused(false);
    } else {
      setIsRendering(false);
      setIsPaused(true);
    }
  };

  // reset flags, sorted primary array
  const reset = () => {
    resetFlags();
    resetSortedPrimary();
  };

  // generate unsorted primary array, renders array
  const shuffle = () => {
    resetFlags();
    generateUnsortedPrimary();
  };

  // update sorted primary array &
  // generate renders array
  // when unsorted primary array changes
  useEffect(() => {
    resetSortedPrimary();
    generateRenders();
  }, [unsortedPrimary]);

  // reset flags, sorted primary array and
  // generate renders array
  // when algorithm changes
  useEffect(() => {
    resetFlags();
    resetSortedPrimary();
    generateRenders();
  }, [algorithm]);

  // generate unsorted primary array
  // when length / min / max changes
  useEffect(() => {
    shuffle();
  }, [length, min, max]);

  // render changes
  // if rendering flag is on
  // when rendering flag changes or rendering index count changes
  useEffect(() => {
    (async () => {
      if (isRendering) {
        await (async () => {
          if (renderIndex === 0) {
            setIsPaused(() => false);
            resetSortedPrimary();

            await new Promise((promise) =>
              setTimeout(promise, 1)
            );
          }
        })();

        renders[renderIndex]();

        await new Promise((promise) =>
          setTimeout(
            promise,
            renderIndex < renders.length - 6
              ? speed
              : 500
          )
        );

        if (renderIndex + 1 < renders.length) {
          setRenderIndex(
            (prevRenderIndex) =>
              prevRenderIndex + 1
          );
        } else {
          setIsRendering(false);
          setRenderIndex(0);
        }
      }
    })();
  }, [isRendering, renderIndex]);

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
            isRendering,
            sortedPrimary,
          },
          handler: {
            reset,
            shuffle,
            sort,
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
