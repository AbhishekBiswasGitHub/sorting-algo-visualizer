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
import generateAuxiliaryArray from "../algorithms/auxiliaryArray";

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
  const [isFullScreen, setIsFullScreen] =
    useState(false);
  const [
    isLoopingRandomly,
    setIsLoopingRandomly,
  ] = useState(false);

  // render states
  const [isRendering, setIsRendering] =
    useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [unsortedPrimary, setUnsortedPrimary] =
    useState([]);
  const [
    unsortedAuxiliary,
    setUnsortedAuxiliary,
  ] = useState([]);
  const [sortedPrimary, setSortedPrimary] =
    useState([]);
  const [sortedAuxiliary, setSortedAuxiliary] =
    useState([]);

  const [renders, setRenders] = useState([]);
  const [renderIndex, setRenderIndex] =
    useState(0);
  const [progress, setProgress] = useState(0);

  // settings handlers

  // set algorithm index if in range
  const updateAlgorithmIndex = (index) => {
    if (index >= 0 && index < ALGORITHM.length) {
      setIsLoopingRandomly(() => false);
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

  // toggle fullscreen
  const toggleFullScreen = () => {
    if (!isFullScreen) {
      if (
        document.documentElement.requestFullscreen
      ) {
        document.documentElement.requestFullscreen();
      } else if (
        document.documentElement
          .mozRequestFullScreen
      ) {
        document.documentElement.mozRequestFullScreen();
      } else if (
        document.documentElement
          .webkitRequestFullscreen
      ) {
        document.documentElement.webkitRequestFullscreen();
      } else if (
        document.documentElement
          .msRequestFullscreen
      ) {
        document.documentElement.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }

    setIsFullScreen(
      (prevIsFullScreen) => !prevIsFullScreen
    );
  };

  // toggle looping
  const toggleLoopingRandomly = () => {
    setIsLoopingRandomly(
      (prevIsLoopingRandomly) =>
        !prevIsLoopingRandomly
    );
    setShowSettings(false);
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

  // set isFullScreen when fullscreen changes
  useEffect(() => {
    const fullscreenChangeHandler = () => {
      setIsFullScreen(
        document.fullscreenElement ||
          document.mozFullScreenElement ||
          document.webkitFullscreenElement ||
          document.msFullscreenElement
      );
    };

    document.addEventListener(
      "fullscreenchange",
      fullscreenChangeHandler
    );
    document.addEventListener(
      "mozfullscreenchange",
      fullscreenChangeHandler
    );
    document.addEventListener(
      "webkitfullscreenchange",
      fullscreenChangeHandler
    );
    document.addEventListener(
      "MSFullscreenChange",
      fullscreenChangeHandler
    );

    // Clean up event listeners when the component unmounts
    return () => {
      document.removeEventListener(
        "fullscreenchange",
        fullscreenChangeHandler
      );
      document.removeEventListener(
        "mozfullscreenchange",
        fullscreenChangeHandler
      );
      document.removeEventListener(
        "webkitfullscreenchange",
        fullscreenChangeHandler
      );
      document.removeEventListener(
        "MSFullscreenChange",
        fullscreenChangeHandler
      );
    };
  }, []);

  // render handlers

  // reset rendering flags
  const resetFlags = () => {
    setIsRendering(() => false);
    setIsPaused(() => false);
    setIsSorted(() => false);
    setRenderIndex(() => 0);
    setProgress(() => 0);
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

  // generate unsorted auxiliary array
  const generateUnsortedAuxiliary = () => {
    setUnsortedAuxiliary(() =>
      generateAuxiliaryArray(unsortedPrimary)[
        algorithm
      ]()
    );
  };

  // reset sorted auxiliary array to unsorted auxiliary array
  const resetSortedAuxiliary = () => {
    setSortedAuxiliary(() => [
      ...unsortedAuxiliary,
    ]);
  };

  // generate renders array
  const generateRenders = () => {
    setRenders(() =>
      algorithms[algorithm](
        unsortedPrimary,
        createRender(setSortedPrimary),
        createRender(setSortedAuxiliary)
      )
    );
  };

  // reset flags, sorted primary array, sorted auxiliary array
  const reset = () => {
    setIsLoopingRandomly(() => false);
    resetFlags();
    resetSortedPrimary();
    resetSortedAuxiliary();
  };

  // generate unsorted primary array, renders array
  const shuffle = () => {
    setIsLoopingRandomly(() => false);
    resetFlags();
    generateUnsortedPrimary();
  };

  // start sorting if not, pause if sorting
  const sort = () => {
    if (!isRendering) {
      if (!isPaused) {
        setIsSorted(() => false);
        setRenderIndex(() => 0);
        setProgress(() => 0);
      }

      setIsRendering(true);
      setIsPaused(false);
    } else {
      setIsRendering(false);
      setIsPaused(true);
    }
  };

  // generate current progress percentage
  const generateProgress = () => {
    setProgress(
      isSorted
        ? 100
        : (
            (100 * renderIndex) /
            renders.length
          ).toFixed(2)
    );
  };

  // generate unsorted auxiliary array, renders array &
  // reset sorted primary array
  // when unsorted primary array changes
  useEffect(() => {
    generateUnsortedAuxiliary();
    generateRenders();
    resetSortedPrimary();
  }, [unsortedPrimary]);

  // reset sorted auxiliary array
  // when unsorted auxiliary array changes
  useEffect(() => {
    resetSortedAuxiliary();
  }, [unsortedAuxiliary]);

  // reset flags, sorted primary array &
  // generate unsorted auxiliary array, renders array
  // when algorithm changes
  useEffect(() => {
    resetFlags();
    generateUnsortedAuxiliary();
    generateRenders();
    resetSortedPrimary();
  }, [algorithm]);

  // generate unsorted primary array
  // when length or min or max changes
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
            setIsSorted(() => false);
            setProgress(() => 0);
            resetSortedPrimary();
            resetSortedAuxiliary();

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
          setIsSorted(true);
          setRenderIndex(0);
        }
      }
    })();
  }, [isRendering, renderIndex]);

  // generate progress when rendering index count changes
  useEffect(() => {
    generateProgress();
  }, [renderIndex]);

  // run continuous sorting with random algorithm
  useEffect(() => {
    (async () => {
      if (isLoopingRandomly) {
        if (isSorted) {
          await (async () => {
            generateUnsortedPrimary();
            setAlgorithmIndex(() =>
              Math.floor(
                Math.random() * ALGORITHM.length
              )
            );

            await new Promise((promise) =>
              setTimeout(promise, 100)
            );
          })();
        }
        await (async () => {
          setIsRendering(() => true);

          await new Promise((promise) =>
            setTimeout(promise, 100)
          );
        })();
      } else if (!isSorted && renderIndex !== 0) {
        await (async () => {
          reset();

          await new Promise((promise) =>
            setTimeout(promise, 1000)
          );
        })();
      }
    })();
  }, [isLoopingRandomly, isSorted]);

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
            isFullScreen,
            isLoopingRandomly,
          },
          handler: {
            toggleShowSettings,
            toggleFullScreen,
            toggleLoopingRandomly,
          },
        },
        render: {
          value: {
            isRendering,
            sortedPrimary,
            sortedAuxiliary,
            progress,
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
