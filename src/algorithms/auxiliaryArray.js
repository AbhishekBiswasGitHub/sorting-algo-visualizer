import generateUnsortedArray from "../utils/generateUnsortedArray";

export default (primary) => ({
  selectionSort: () => [],
  doubleSelectionSort: () => [],
  heapSort: () => [],
  insertionSort: () => [],
  binaryInsertionSort: () => [],
  shellSort: () => [],
  mergeSort: () =>
    generateUnsortedArray(primary.length, 0, 0),
});
