import { createContext } from "react";

export const algoContext = createContext({});

export function AlgoContextProvider({ children }) {
  const timer = (time) => {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  };

  const insertionSort = async (unsortedArray, updateArray) => {
    let tempArray = [...unsortedArray];
    for (let i = 1; i < tempArray.length; i++) {
      let key = tempArray[i];
      let j = i - 1;
      while (j >= 0 && tempArray[j] > key) {
        tempArray[j + 1] = tempArray[j];
        updateArray([...tempArray]);
        document.getElementById(`bar-${j}`).classList.add("swapping");
        await timer(60);
        document.getElementById(`bar-${j}`).classList.remove("swapping");
        j = j - 1;
      }
      tempArray[j + 1] = key;
      updateArray([...tempArray]);
      document.getElementById(`bar-${j + 1}`).classList.add("sorted");
      await timer(60);
    }
  };

  const bubbleSort = async (unsortedArray, updateArray) => {
    let tempArray = [...unsortedArray];
    for (let i = 0; i < tempArray.length - 1; i++) {
      for (let j = i + 1; j < tempArray.length; j++) {
        if (tempArray[i] > tempArray[j]) {
          let t = tempArray[j];
          tempArray[j] = tempArray[i];
          tempArray[i] = t;
          updateArray([...tempArray]);
          document.getElementById(`bar-${i}`).classList.add("swapping");
          document.getElementById(`bar-${j}`).classList.add("swapping");
          await timer((i - j) * 2);
          document.getElementById(`bar-${i}`).classList.remove("swapping");
          document.getElementById(`bar-${j}`).classList.remove("swapping");
        }
      }
      document.getElementById(`bar-${i}`).classList.add("sorted");
    }
    document
      .getElementById(`bar-${tempArray.length - 1}`)
      .classList.add("sorted");
  };

  return (
    <algoContext.Provider value={{ insertionSort, bubbleSort }}>
      {children}
    </algoContext.Provider>
  );
}
