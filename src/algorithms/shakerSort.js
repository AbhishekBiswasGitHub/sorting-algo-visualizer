import STATUS from "../data/status";

const {
  UNSORTED,
  SORTED,
  ACTIVE,
  LESS,
  GREATER,
} = STATUS;

const shakerSort = (primary, renderPrimary) => {
  const renders = [];
  const numbers = primary.map(
    ({ value }) => value
  );
  const n = numbers.length;
  let unsortedStartIndex = 0;
  let unsortedEndIndex = n - 1;

  for (let i = 0; i < n - 1; i++) {
    unsortedEndIndex = n - 2 - i;
    let swapped = false;

    for (let j = i; j < n - 1 - i; j++) {
      const localI = i;

      if (numbers[j] <= numbers[j + 1]) {
        // set current element as less
        // set next element as greater
        renders.push(() => {
          renderPrimary((data) => {
            data[j].status = LESS;
            data[j + 1].status =
              data[j].value === data[j + 1].value
                ? LESS
                : GREATER;
          });
        });

        // set current element as unsorted
        // set last element as sorted
        renders.push(() => {
          renderPrimary((data) => {
            data[j].status = UNSORTED;
            if (j + 1 === n - 1 - localI) {
              data[j + 1].status = SORTED;
            }
          });
        });
      }

      if (numbers[j] > numbers[j + 1]) {
        [numbers[j], numbers[j + 1]] = [
          numbers[j + 1],
          numbers[j],
        ];
        swapped = true;

        // set current element as greater
        // set next element as less
        renders.push(() => {
          renderPrimary((data) => {
            data[j].status = GREATER;
            data[j + 1].status = LESS;
          });
        });

        // swap current element with next element
        renders.push(() => {
          renderPrimary((data) => {
            [data[j].value, data[j + 1].value] = [
              data[j + 1].value,
              data[j].value,
            ];
            data[j].status = LESS;
            data[j + 1].status = GREATER;
          });
        });

        // set current element as unsorted
        // set last element as sorted
        renders.push(() => {
          renderPrimary((data) => {
            data[j].status = UNSORTED;
            if (j + 1 === n - 1 - localI) {
              data[j + 1].status = SORTED;
            }
          });
        });
      }
    }

    if (!swapped) {
      break;
    }

    unsortedStartIndex = i + 1;
    swapped = false;

    for (let j = n - 3 - i; j >= i; j--) {
      const localI = i;

      if (numbers[j] <= numbers[j + 1]) {
        // set previous element as less
        // set current element as greater
        renders.push(() => {
          renderPrimary((data) => {
            data[j].status = LESS;
            data[j + 1].status =
              data[j].value === data[j + 1].value
                ? LESS
                : GREATER;
          });
        });

        // set first element as sorted
        // set current element as unsorted
        renders.push(() => {
          renderPrimary((data) => {
            if (j === localI) {
              data[j].status = SORTED;
            }
            data[j + 1].status = UNSORTED;
          });
        });
      }

      if (numbers[j] > numbers[j + 1]) {
        [numbers[j], numbers[j + 1]] = [
          numbers[j + 1],
          numbers[j],
        ];
        swapped = true;

        // set previous element as greater
        // set current element as less
        renders.push(() => {
          renderPrimary((data) => {
            data[j].status = GREATER;
            data[j + 1].status = LESS;
          });
        });

        // swap current element with previous element
        renders.push(() => {
          renderPrimary((data) => {
            [data[j].value, data[j + 1].value] = [
              data[j + 1].value,
              data[j].value,
            ];
            data[j + 1].status = GREATER;
            data[j].status = LESS;
          });
        });

        // set first element as sorted
        // set current element as unsorted
        renders.push(() => {
          renderPrimary((data) => {
            if (j === localI) {
              data[j].status = SORTED;
            }
            data[j + 1].status = UNSORTED;
          });
        });
      }
    }

    if (!swapped) {
      break;
    }
  }

  if (unsortedEndIndex >= unsortedStartIndex) {
    // set all remaining elements as sorted
    renders.push(() => {
      renderPrimary((data) => {
        let start = unsortedStartIndex;
        const end = unsortedEndIndex;

        while (start <= end) {
          data[start].status = SORTED;
          start++;
        }
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

export default shakerSort;
