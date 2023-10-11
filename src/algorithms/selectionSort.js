import STATUS from "../data/status";
const { UNSORTED, SORTED, ACTIVE, LESS } = STATUS;

const selectionSort = (
  primary,
  renderPrimary
) => {
  const renders = [];
  const numbers = primary.map(
    ({ value }) => value
  );
  const n = numbers.length;

  for (let i = 0; i < n - 1; i++) {
    let min = numbers[i];
    let minIndex = i;

    // select current position to be sorted
    renders.push(() => {
      renderPrimary((data) => {
        data[i].status = ACTIVE;
      });
    });

    // set element at the current position as the minimum
    renders.push(() => {
      renderPrimary((data) => {
        data[i].status = LESS;
      });
    });

    for (let j = i + 1; j < n; j++) {
      let localMinIndex = minIndex;

      // select current element
      renders.push(() => {
        renderPrimary((data) => {
          data[j].status = ACTIVE;
        });
      });

      if (numbers[j] < min) {
        // set the current element as the minimum
        renders.push(() => {
          renderPrimary((data) => {
            data[j].status = LESS;
            data[localMinIndex].status = UNSORTED;
          });
        });

        min = numbers[j];
        minIndex = j;
      } else {
        // deselect current element
        renders.push(() => {
          renderPrimary((data) => {
            data[j].status = UNSORTED;
          });
        });
      }
    }

    if (minIndex !== i) {
      // select current position to be sorted
      renders.push(() => {
        renderPrimary((data) => {
          data[i].status = ACTIVE;
        });
      });

      // swap element at current position to be sorted with the minimum element
      renders.push(() => {
        renderPrimary((data) => {
          data[minIndex].value = data[i].value;
          data[minIndex].status = ACTIVE;
          data[i].value = min;
          data[i].status = LESS;
        });
      });

      // set the new element at current position to be sorted as sorted and
      // deselect the new element at the minimum element's position
      renders.push(() => {
        renderPrimary((data) => {
          data[minIndex].status = UNSORTED;
          data[i].status = SORTED;
        });
      });

      numbers[minIndex] = numbers[i];
      numbers[i] = min;
    } else {
      // set the element at current position to be sorted as sorted
      renders.push(() => {
        renderPrimary((data) => {
          data[i].status = SORTED;
        });
      });
    }
  }

  // set the last element as sorted
  renders.push(() => {
    renderPrimary((data) => {
      data[n - 1].status = SORTED;
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

  return renders;
};

export default selectionSort;
