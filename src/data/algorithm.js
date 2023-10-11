import algorithms from "../algorithms/algorithms";
import titleCaseFromCamelCase from "../utils/titleCaseFromCamelCase";

const ALGORITHM = [];

for (let key in algorithms) {
  ALGORITHM.push({
    title: titleCaseFromCamelCase(key),
    value: key,
  });
}

export default ALGORITHM;
