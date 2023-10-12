import STATUS from "../data/status";

const {
  UNSORTED,
  SORTED,
  ACTIVE,
  LESS,
  GREATER,
} = STATUS;

const bubbleSort = (primary, renderPrimary) => {
  const renders = [];
  const numbers = primary.map(
    ({ value }) => value
  );
  const n = numbers.length;
  let unsortedEndIndex = n - 1;

  for (let i = 0; i < n - 1; i++) {
    unsortedEndIndex = n - 2 - i;
    let swapped = false;

    for (let j = 0; j < n - 1 - i; j++) {
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
  }

  if (unsortedEndIndex >= 0) {
    // set all remaining element as sorted
    renders.push(() => {
      renderPrimary((data) => {
        let end = unsortedEndIndex;

        while (end >= 0) {
          data[end].status = SORTED;
          end--;
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

export default bubbleSort;
