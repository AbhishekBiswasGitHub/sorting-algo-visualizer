import "./App.css";
import Range from "./components/Range";

const App = () => {
  return (
    <Range
      title="number of elements"
      icon="bars"
      values={[
        { title: "zero" },
        { title: "one" },
        { title: "two" },
      ]}
      index={1}
      setIndex={() => {}}
    />
  );
};

export default App;
