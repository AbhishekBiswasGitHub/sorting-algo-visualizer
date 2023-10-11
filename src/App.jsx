import AppContextProvider from "./contexts/AppContext";

import ColorCodeInfo from "./components/ColorCodeInfo";
import Title from "./components/Title";
import Settings from "./components/Settings";
import PrimaryArray from "./components/PrimaryArray";
import AuxiliaryArray from "./components/AuxiliaryArray";
import ProgressBar from "./components/ProgressBar";
import Controls from "./components/Controls";

import "./App.css";

const App = () => {
  return (
    <div id="App">
      <AppContextProvider>
        <ColorCodeInfo />
        <Settings />
        <Title />
        <PrimaryArray />
        <AuxiliaryArray />
        <ProgressBar />
        <Controls />
      </AppContextProvider>
    </div>
  );
};

export default App;
