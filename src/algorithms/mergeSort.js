import STATUS from "../data/status";

const { UNSORTED, SORTED, ACTIVE, LESS } = STATUS;

const mergeSort = (
  primary,
  renderPrimary,
  renderAuxiliary
) => {
  const renders = [];
  const unsorted = primary.map(
    ({ value }) => value
  );
  const n = unsorted.length;

  const sort = (numbers, from, to) => {
    if (from < to) {
      const receivedFrom = from;
      const receivedTo = to;
      const mid = Math.floor((from + to + 1) / 2);

      sort(numbers, from, mid - 1);
      sort(numbers, mid, to);

      const left = numbers.slice(from, mid);
      const right = numbers.slice(mid, to + 1);

      const merged = merge(left, right);

      let leftIndex = receivedFrom;
      let rightIndex = mid;

      // select elements of two arrays to be merged
      renders.push(() => {
        renderPrimary((data) => {
          for (
            let i = receivedFrom;
            i <= receivedTo;
            i++
          ) {
            data[i].status = ACTIVE;
          }
        });
      });

      for (let i = 0; i < merged.length; i++) {
        let localLeftIndex = leftIndex;
        let localRightIndex = rightIndex;

        if (
          leftIndex < mid &&
          merged[i] === numbers[leftIndex]
        ) {
          // set left array's element as smallest
          renders.push(() => {
            renderPrimary((data) => {
              data[localLeftIndex].status = LESS;
            });
          });

          // move the element from primary array to auxiliary array and set as sorted
          renders.push(() => {
            renderAuxiliary((data) => {
              data[receivedFrom + i].value =
                merged[i];
              data[receivedFrom + i].status =
                SORTED;
            });
            renderPrimary((data) => {
              data[localLeftIndex].value = 0;
              data[localLeftIndex].status =
                UNSORTED;
            });
          });

          leftIndex++;
        } else if (
          rightIndex <= to &&
          merged[i] === numbers[rightIndex]
        ) {
          // set right array's element as smallest
          renders.push(() => {
            renderPrimary((data) => {
              data[localRightIndex].status = LESS;
            });
          });

          // move the element from primary array to auxiliary array and set as sorted
          renders.push(() => {
            renderAuxiliary((data) => {
              data[receivedFrom + i].value =
                merged[i];
              data[receivedFrom + i].status =
                SORTED;
            });
            renderPrimary((data) => {
              data[localRightIndex].value = 0;
              data[localRightIndex].status =
                UNSORTED;
            });
          });

          rightIndex++;
        }
      }

      // move elements of auxiliary array to primary array
      for (let i = 0; i < merged.length; i++) {
        numbers[from + i] = merged[i];
        renders.push(() => {
          renderPrimary((data) => {
            data[receivedFrom + i].value =
              merged[i];
            data[receivedFrom + i].status =
              merged.length === unsorted.length
                ? SORTED
                : UNSORTED;
          });
          renderAuxiliary((data) => {
            data[receivedFrom + i].value = 0;
            data[receivedFrom + i].status =
              UNSORTED;
          });
        });
      }
    }
  };
  const merge = (left, right) => {
    let merged = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (
      leftIndex < left.length &&
      rightIndex < right.length
    ) {
      if (left[leftIndex] < right[rightIndex]) {
        merged.push(left[leftIndex]);
        leftIndex++;
      } else {
        merged.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return [
      ...merged,
      ...left.slice(leftIndex),
      ...right.slice(rightIndex),
    ];
  };

  sort(unsorted, 0, n - 1);

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

export default mergeSort;
