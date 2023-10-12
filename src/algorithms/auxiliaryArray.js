import generateUnsortedArray from "../utils/generateUnsortedArray";

export default (primary) => ({
  selectionSort: () => [],
  doubleSelectionSort: () => [],
  mergeSort: () =>
    generateUnsortedArray(primary.length, 0, 0),
});
