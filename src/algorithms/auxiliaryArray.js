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
  combSort: () => [],
  quickSort: () => [],
  mergeSort: () =>
    generateUnsortedArray(primary.length, 0, 0),
});
