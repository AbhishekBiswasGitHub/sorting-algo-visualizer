import STATUS from "../data/status";

const { UNSORTED, SORTED, ACTIVE, GREATER } =
  STATUS;

const heapSort = (primary, renderPrimary) => {
  const renders = [];

  const numbers = primary.map(
    ({ value }) => value
  );

  const heapify = (
    numbers,
    length,
    largestIndex
  ) => {
    let currentLargestIndex = largestIndex;
    const leftIndex = 2 * currentLargestIndex + 1;
    const rightIndex =
      2 * currentLargestIndex + 2;

    // select current node, left child & right child
    renders.push(() => {
      renderPrimary((data) => {
        data[largestIndex].status = ACTIVE;
      });

      if (leftIndex < length) {
        renderPrimary((data) => {
          data[leftIndex].status = ACTIVE;
        });
      }

      if (rightIndex < length) {
        renderPrimary((data) => {
          data[rightIndex].status = ACTIVE;
        });
      }
    });

    if (
      leftIndex < length &&
      numbers[leftIndex] >
        numbers[currentLargestIndex]
    ) {
      currentLargestIndex = leftIndex;

      if (
        numbers[leftIndex] > numbers[rightIndex]
      ) {
        // set left child as maximum
        renders.push(() => {
          renderPrimary((data) => {
            data[leftIndex].status = GREATER;
          });
        });
      }
    }

    if (
      rightIndex < length &&
      numbers[rightIndex] >
        numbers[currentLargestIndex]
    ) {
      currentLargestIndex = rightIndex;

      // set right child as maximum
      renders.push(() => {
        renderPrimary((data) => {
          data[rightIndex].status = GREATER;
        });
      });
    }

    if (currentLargestIndex !== largestIndex) {
      [
        numbers[largestIndex],
        numbers[currentLargestIndex],
      ] = [
        numbers[currentLargestIndex],
        numbers[largestIndex],
      ];

      // swap node with maximum
      renders.push(() => {
        renderPrimary((data) => {
          [
            data[largestIndex].value,
            data[currentLargestIndex].value,
          ] = [
            data[currentLargestIndex].value,
            data[largestIndex].value,
          ];
          data[largestIndex].status = GREATER;
          data[currentLargestIndex].status =
            ACTIVE;
        });
      });

      // deselect current node, left child & right child
      renders.push(() => {
        renderPrimary((data) => {
          data[largestIndex].status = UNSORTED;
        });

        if (leftIndex < length) {
          renderPrimary((data) => {
            data[leftIndex].status = UNSORTED;
          });
        }

        if (rightIndex < length) {
          renderPrimary((data) => {
            data[rightIndex].status = UNSORTED;
          });
        }
      });

      heapify(
        numbers,
        length,
        currentLargestIndex
      );
    } else {
      // set current node as maximum
      renders.push(() => {
        renderPrimary((data) => {
          data[largestIndex].status = GREATER;
        });
      });

      // deselect current node, left child & right child
      renders.push(() => {
        renderPrimary((data) => {
          data[largestIndex].status = UNSORTED;
        });

        if (leftIndex < length) {
          renderPrimary((data) => {
            data[leftIndex].status = UNSORTED;
          });
        }

        if (rightIndex < length) {
          renderPrimary((data) => {
            data[rightIndex].status = UNSORTED;
          });
        }
      });
    }
  };
  const sort = (numbers) => {
    const n = numbers.length;

    for (
      let i = Math.floor(n / 2) - 1;
      i >= 0;
      i--
    ) {
      heapify(numbers, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
      [numbers[0], numbers[i]] = [
        numbers[i],
        numbers[0],
      ];

      // set first element as maximum
      renders.push(() => {
        renderPrimary((data) => {
          data[0].status = GREATER;
          data[i].status = ACTIVE;
        });
      });

      // swap first element with last element
      renders.push(() => {
        renderPrimary((data) => {
          [data[0].value, data[i].value] = [
            data[i].value,
            data[0].value,
          ];
          data[i].status = GREATER;
          data[0].status = ACTIVE;
        });
      });

      // set last element as sorted and first element as unsorted
      renders.push(() => {
        renderPrimary((data) => {
          data[0].status = UNSORTED;
          data[i].status = SORTED;
        });
      });

      heapify(numbers, i, 0);
    }

    // set last element as maximum
    renders.push(() => {
      renderPrimary((data) => {
        data[0].status = GREATER;
      });
    });

    // set last element as sorted
    renders.push(() => {
      renderPrimary((data) => {
        data[0].status = SORTED;
      });
    });

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
  };

  sort(numbers);

  return renders;
};

export default heapSort;
