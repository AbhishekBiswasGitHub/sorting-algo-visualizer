/*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
import STATUS from "../data/status";

const {
  UNSORTED,
  SORTED,
  ACTIVE,
  LESS,
  GREATER,
} = STATUS;

const quickSort = (primary, renderPrimary) => {
  const renders = [];
  const numbers = primary.map(
    ({ value }) => value
  );
  const n = numbers.length;
  const sort = (numbers, from, to) => {
    if (from < to) {
      const mid = partition(numbers, from, to);

      sort(numbers, from, mid - 1);
      sort(numbers, mid + 1, to);
    }
  };
  const partition = (numbers, from, to) => {
    const pivot = numbers[from];
    let left = from + 1;
    let right = to;

    const receivedFrom = from;
    const receivedLeft = left;
    const receivedRight = right;

    // select first element
    // set left pointer element as less
    // set right pointer element as greater
    renders.push(() => {
      renderPrimary((data) => {
        data[receivedFrom].status = ACTIVE;
        data[receivedLeft].status = LESS;
        data[receivedRight].status = GREATER;
      });
    });

    while (true) {
      while (
        left <= right &&
        numbers[left] <= pivot
      ) {
        const localLeft = left;

        // set left pointer element as less
        renders.push(() => {
          renderPrimary((data) => {
            data[localLeft].status = LESS;
          });
        });

        // set left pointer element as unsorted
        renders.push(() => {
          renderPrimary((data) => {
            data[localLeft].status = UNSORTED;
          });
        });

        left++;
      }

      if (left < right) {
        const localLeft = left;

        // set left pointer element as greater
        renders.push(() => {
          renderPrimary((data) => {
            data[localLeft].status = GREATER;
          });
        });
      } else if (left === right) {
        const localLeft = left;

        // set left pointer element as unsorted
        // select element before left pointer element
        renders.push(() => {
          renderPrimary((data) => {
            data[localLeft].status = UNSORTED;
            data[localLeft - 1].status = ACTIVE;
          });
        });
      }

      while (
        right >= left &&
        numbers[right] >= pivot
      ) {
        const localRight = right;

        if (right > left) {
          // set right pointer element as greater
          renders.push(() => {
            renderPrimary((data) => {
              data[localRight].status = GREATER;
            });
          });

          // set right pointer element as unsorted
          renders.push(() => {
            renderPrimary((data) => {
              data[localRight].status = UNSORTED;
            });
          });
        } else if (right === left) {
          // set right pointer element as unsorted
          // select element before right pointer element
          renders.push(() => {
            renderPrimary((data) => {
              data[localRight].status = UNSORTED;
              data[localRight - 1].status =
                ACTIVE;
            });
          });
        }

        right--;
      }

      if (left < right) {
        const localLeft = left;
        const localRight = right;

        [numbers[left], numbers[right]] = [
          numbers[right],
          numbers[left],
        ];

        // set right pointer element as less
        renders.push(() => {
          renderPrimary((data) => {
            data[localRight].status = LESS;
          });
        });

        // swap left pointer element with right pointer element
        renders.push(() => {
          renderPrimary((data) => {
            [
              data[localLeft].value,
              data[localRight].value,
            ] = [
              data[localRight].value,
              data[localLeft].value,
            ];
            data[localLeft].status = LESS;
            data[localRight].status = GREATER;
          });
        });
      } else {
        break;
      }
    }

    [numbers[from], numbers[right]] = [
      numbers[right],
      numbers[from],
    ];

    // swap first element with right pointer element
    renders.push(() => {
      renderPrimary((data) => {
        [data[from].value, data[right].value] = [
          data[right].value,
          data[from].value,
        ];
      });
    });

    if (right - from < 2 || to - right < 2) {
      const start =
        right - from < 2 ? from : right;
      const end = to - right < 2 ? to : right;

      // set both elements as sorted
      renders.push(() => {
        renderPrimary((data) => {
          for (let i = start; i <= end; i++) {
            data[i].status = SORTED;
          }
        });
      });
    } else {
      // set first element as unsorted
      // set right pointer element as sorted
      renders.push(() => {
        renderPrimary((data) => {
          data[from].status = UNSORTED;
          data[right].status = SORTED;
        });
      });
    }

    return right;
  };

  sort(numbers, 0, n - 1);

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

export default quickSort;
