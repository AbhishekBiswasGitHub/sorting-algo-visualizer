import STATUS from "../data/status";
const { UNSORTED } = STATUS;

const generateUnsortedArray = (
  length,
  min,
  max
) => {
  const generateRandomNumber = () =>
    Math.floor(Math.random() * (max - min + 1)) +
    min;
  const unsortedArray = [];

  for (let i = 0; i < length; i++) {
    unsortedArray.push({
      value: generateRandomNumber(),
      status: UNSORTED,
    });
  }

  return unsortedArray;
};

export default generateUnsortedArray;
