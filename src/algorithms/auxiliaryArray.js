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
  countingSort: () => {
    const min = Math.min(
      ...primary.map(({ value }) => value)
    );
    const max = Math.max(
      ...primary.map(({ value }) => value)
    );

    return generateUnsortedArray(
      max - min + 1,
      0,
      0
    );
  },
});
