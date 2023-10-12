import generateUnsortedArray from "../utils/generateUnsortedArray";

export default (primary) => ({
  selectionSort: () => [],
  doubleSelectionSort: () => [],
  heapSort: () => [],
  insertionSort: () => [],
  binaryInsertionSort: () => [],
  shellSort: () => [],
  bubbleSort: () => [],
  shakerSort: () => [],
  mergeSort: () =>
    generateUnsortedArray(primary.length, 0, 0),
});
