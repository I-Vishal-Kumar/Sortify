import { useState, useEffect, useContext } from "react";
import Bar from "./components/Bar";
import "./App.css";
import { algoContext } from "./sortingAlgo/Algorithms";

const MAX_LENGTH = 1000;
const DEFAULT_LENGTH = 50;

const App = () => {
  const [array, setArray] = useState([]);
  const { insertionSort, bubbleSort } = useContext(algoContext);
  const [algo, updateAlgo] = useState("bubble"); //default sorting algo = bubble sort
  const [algoAvailable] = useState(["bubble", "insertion"]); // storing available sorting techniques update when new one gets added

  useEffect(() => {
    randomize(DEFAULT_LENGTH);
  }, []);

  const randomize = (length) => {
    setArray(
      Array(length)
        .fill()
        .map(() => Math.round(Math.random() * 200 + 30))
    );
  };

  const handleLengthChange = (e) => {
    const newLength = Number(e.target.value);
    if (newLength >= 0 && newLength <= MAX_LENGTH) {
      randomize(newLength);
      e.target.setCustomValidity("");
    } else if (newLength > MAX_LENGTH) {
      e.target.setCustomValidity(`The maximum array length is ${MAX_LENGTH}`);
    } else {
      e.target.setCustomValidity("Length must be a positive integer");
    }
  };

  const sort = () => {
    switch (algo) {
      case "bubble":
        bubbleSort(array, setArray);
        break;
      case "insertion":
        insertionSort(array, setArray);
        break;
    }
  };

  return (
    <>
      <h1 className="title">SORTIFY</h1>
      <div className="control-panel">
        <div className="input-group">
          <input
            id="length-input"
            className="input"
            type="number"
            placeholder="SIZE"
            min="0"
            max={MAX_LENGTH}
            onChange={handleLengthChange}
          ></input>
        </div>
        <button id="sort" formAction="submit" onClick={sort}>
          SORT
        </button>
        <button
          id="randomize"
          formAction="submit"
          onClick={() => randomize(DEFAULT_LENGTH)}
        >
          RANDOMIZE
        </button>
        <select onChange={(e) => updateAlgo(e.target.value)}>
          {algoAvailable.map((algo, idx) => (
            <option key={`algo-${idx}`} value={algo}>
              {algo} sort
            </option>
          ))}
        </select>
      </div>
      <div className="bars">
        {array.map((value, key) => (
          <Bar id={`bar-${key}`} key={key} index={key} height={value} />
        ))}
      </div>
    </>
  );
};

export default App;
