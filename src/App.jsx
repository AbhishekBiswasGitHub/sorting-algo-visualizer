import { useContext } from "react";

import { AppContext } from "./contexts/AppContext";

import ColorCodeInfo from "./components/ColorCodeInfo";
import Title from "./components/Title";
import Settings from "./components/Settings";
import ArrayViz from "./components/ArrayViz";
import ProgressBar from "./components/ProgressBar";
import Controls from "./components/Controls";

import "./App.css";

const App = () => {
  const { settings, render } =
    useContext(AppContext);
  const { min, max } = settings.value;
  const { sortedPrimary } = render.value;

  return (
    <div id="App">
      <ColorCodeInfo />
      <Settings />
      <Title />
      <ArrayViz
        min={min}
        max={max}
        array={sortedPrimary}
      />
      <ProgressBar progress={50} />
      <Controls />
    </div>
  );
};

export default App;
