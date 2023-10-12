import STATUS from "../data/status";

const {
  UNSORTED,
  SORTED,
  ACTIVE,
  LESS,
  GREATER,
} = STATUS;

const doubleSelectionSort = (
  primary,
  renderPrimary
) => {
  const renders = [];
  const numbers = primary.map(
    ({ value }) => value
  );
  const n = numbers.length;
  const mid = Math.floor(n / 2);

  for (let i = 0; i < mid; i++) {
    let min = numbers[i];
    let minIndex = i;
    let max = numbers[i];
    let maxIndex = i;

    // select current position to be sorted at start
    renders.push(() => {
      renderPrimary((data) => {
        data[i].status = ACTIVE;
      });
    });

    for (let j = i + 1; j < n - i; j++) {
      // select current element
      renders.push(() => {
        renderPrimary((data) => {
          data[j].status = ACTIVE;
        });
      });

      if (numbers[j] < min) {
        const localMinIndex = minIndex;
        const localMaxIndex = maxIndex;

        // set current element as the minimum
        renders.push(() => {
          renderPrimary((data) => {
            data[j].status = LESS;
            data[localMinIndex].status =
              localMinIndex === localMaxIndex
                ? GREATER
                : UNSORTED;
          });
        });

        min = numbers[j];
        minIndex = j;
      }

      if (numbers[j] > max) {
        const localMinIndex = minIndex;
        const localMaxIndex = maxIndex;

        // set current element as the maximum
        renders.push(() => {
          renderPrimary((data) => {
            data[j].status = GREATER;
            data[localMaxIndex].status =
              localMaxIndex === localMinIndex
                ? LESS
                : UNSORTED;
          });
        });

        max = numbers[j];
        maxIndex = j;
      }

      if (!(j === minIndex || j === maxIndex)) {
        // deselect current element
        renders.push(() => {
          renderPrimary((data) => {
            data[j].status = UNSORTED;
          });
        });
      }
    }

    if (minIndex !== i) {
      // select current position to be sorted at start
      renders.push(() => {
        renderPrimary((data) => {
          data[i].status = ACTIVE;
        });
      });

      // swap element at current position to be sorted at start with the minimum element
      renders.push(() => {
        renderPrimary((data) => {
          data[minIndex].value = data[i].value;
          data[minIndex].status =
            maxIndex === minIndex
              ? GREATER
              : UNSORTED;
          data[i].value = min;
          data[i].status = LESS;
        });
      });

      numbers[minIndex] = numbers[i];
      numbers[i] = min;
    }

    if (maxIndex !== n - 1 - i) {
      if (maxIndex === i) {
        maxIndex = minIndex;
      }

      // select current position to be sorted at end
      renders.push(() => {
        renderPrimary((data) => {
          data[n - 1 - i].status = ACTIVE;
        });
      });

      // swap element at current position to be sorted at end with the maximum element
      renders.push(() => {
        renderPrimary((data) => {
          data[maxIndex].value =
            data[n - 1 - i].value;
          data[maxIndex].status = UNSORTED;
          data[n - 1 - i].value = max;
          data[n - 1 - i].status = GREATER;
        });
      });

      numbers[maxIndex] = numbers[n - 1 - i];
      numbers[n - 1 - i] = max;
    }

    // set current position to be sorted at start and end as sorted
    renders.push(() => {
      renderPrimary((data) => {
        data[i].status = SORTED;
        data[n - 1 - i].status = SORTED;
      });
    });
  }

  if (n % 2 === 1) {
    // set middle element of odd length array as sorted
    renders.push(() => {
      renderPrimary((data) => {
        data[mid].status = SORTED;
      });
    });
  }

  // indicate sort completion
  for (let i = 0; i < 3; i++) {
    // select all elements
    renders.push(() => {
      renderPrimary((data) => {
        for (let j = 0; j < n; j++) {
          data[j].status = ACTIVE;
        }
      });
    });

    // set all elements as sorted
    renders.push(() => {
      renderPrimary((data) => {
        for (let j = 0; j < n; j++) {
          data[j].status = SORTED;
        }
      });
    });
  }

  return renders;
};

export default doubleSelectionSort;
