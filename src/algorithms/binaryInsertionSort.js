import STATUS from "../data/status";

const { SORTED, ACTIVE, LESS } = STATUS;

const binaryInsertionSort = (
  primary,
  renderPrimary
) => {
  const renders = [];
  const numbers = primary.map(
    ({ value }) => value
  );
  const n = numbers.length;

  for (let i = 1; i < n; i++) {
    const current = numbers[i];
    let left = 0;
    let right = i - 1;

    // select current element to be sorted
    renders.push(() => {
      renderPrimary((data) => {
        data[i].status = ACTIVE;
      });
    });

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      // select current element
      renders.push(() => {
        renderPrimary((data) => {
          data[mid].status = ACTIVE;
        });
      });

      if (current < numbers[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }

      // deselect current element
      renders.push(() => {
        renderPrimary((data) => {
          data[mid].status = SORTED;
        });
      });
    }

    if (left !== i) {
      if (left - 1 >= 0) {
        // set element before current element as less
        renders.push(() => {
          renderPrimary((data) => {
            data[left - 1].status = LESS;
          });
        });
      }

      for (let j = i - 1; j >= left; j--) {
        numbers[j + 1] = numbers[j];

        // shift current element to right
        renders.push(() => {
          renderPrimary((data) => {
            data[j + 1].value = data[j].value;
            data[j + 1].status = SORTED;
            data[j].value = 0;
          });
        });
      }

      numbers[left] = current;

      // insert current element to be sorted right next to the current element
      renders.push(() => {
        renderPrimary((data) => {
          data[left].value = current;
          data[left].status = ACTIVE;
        });
      });

      // set current element to be sorted as sorted
      renders.push(() => {
        renderPrimary((data) => {
          data[left].status = SORTED;
        });
      });

      if (left - 1 >= 0) {
        // set element before current element as sorted
        renders.push(() => {
          renderPrimary((data) => {
            data[left - 1].status = SORTED;
          });
        });
      }
    } else {
      // set element before current element to be sorted as less
      renders.push(() => {
        renderPrimary((data) => {
          data[i - 1].status = LESS;
        });
      });

      // set current element to be sorted and element before it as sorted
      renders.push(() => {
        renderPrimary((data) => {
          data[i - 1].status = SORTED;
          data[i].status = SORTED;
        });
      });
    }
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

export default binaryInsertionSort;
