import { useContext } from "react";

import { AppContext } from "./contexts/AppContext";

import ColorCodeInfo from "./components/ColorCodeInfo";
import Settings from "./components/Settings";
import Controls from "./components/Controls";
import ArrayViz from "./components/ArrayViz";

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
      <ArrayViz
        min={min}
        max={max}
        array={sortedPrimary}
      />
      <Controls />
    </div>
  );
};

export default App;
