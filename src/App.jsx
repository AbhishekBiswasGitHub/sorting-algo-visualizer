import ColorCodeInfo from "./components/ColorCodeInfo";
import Settings from "./components/Settings";
import Controls from "./components/Controls";
import ArrayViz from "./components/ArrayViz";

import "./App.css";

const App = () => {
  return (
    <div id="App">
      <ColorCodeInfo />
      <Settings />
      <ArrayViz
        min={-10}
        max={10}
        array={[
          { value: -10, status: "#333399" },
          { value: -9, status: "#333399" },
          { value: -8, status: "#333399" },
          { value: -7, status: "#333399" },
          { value: -6, status: "#333399" },
          { value: -5, status: "#333399" },
          { value: -4, status: "#333399" },
          { value: -3, status: "#333399" },
          { value: -2, status: "#333399" },
          { value: -1, status: "#333399" },
          { value: 0, status: "#333399" },
          { value: 1, status: "#333399" },
          { value: 2, status: "#333399" },
          { value: 3, status: "#333399" },
          { value: 4, status: "#333399" },
          { value: 5, status: "#333399" },
          { value: 6, status: "#333399" },
          { value: 7, status: "#333399" },
          { value: 8, status: "#333399" },
          { value: 9, status: "#333399" },
          { value: 10, status: "#333399" },
        ]}
      />
      <Controls />
    </div>
  );
};

export default App;
