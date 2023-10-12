import STATUS from "../data/status";

const { SORTED, ACTIVE, LESS, GREATER } = STATUS;

const insertionSort = (
  primary,
  renderPrimary
) => {
  const renders = [];
  const numbers = primary.map(
    ({ value }) => value
  );
  const n = numbers.length;

  for (let i = 1; i < n; i++) {
    let current = numbers[i];
    let j = i - 1;
    const currentJ = j;

    // select current element to be sorted
    renders.push(() => {
      renderPrimary((data) => {
        data[currentJ + 1].status = ACTIVE;
      });
    });

    if (numbers[j] <= numbers[j + 1]) {
      // set current element as less
      renders.push(() => {
        renderPrimary((data) => {
          data[currentJ].status = LESS;
        });
      });

      // set current element to be sorted & current element as sorted
      renders.push(() => {
        renderPrimary((data) => {
          data[currentJ].status = SORTED;
          data[currentJ + 1].status = SORTED;
        });
      });
    }

    while (j >= 0 && numbers[j] > current) {
      const localJ = j;

      // set current element as greater
      renders.push(() => {
        renderPrimary((data) => {
          data[localJ].status = GREATER;
        });
      });

      numbers[j + 1] = numbers[j];

      // shift current element to right
      renders.push(() => {
        renderPrimary((data) => {
          data[localJ + 1].value =
            data[localJ].value;
          data[localJ + 1].status = SORTED;
          data[localJ].value = 0;
          data[localJ].status = SORTED;
        });
      });

      j--;

      if (j >= 0 && numbers[j] <= current) {
        // set current element as less
        renders.push(() => {
          renderPrimary((data) => {
            data[localJ - 1].status = LESS;
          });
        });
      }
    }

    if (j + 1 !== i) {
      numbers[j + 1] = current;

      // insert current element to be sorted right next to the current element
      renders.push(() => {
        renderPrimary((data) => {
          data[j + 1].value = current;
          data[j + 1].status = ACTIVE;
        });
      });

      // set current element to be sorted as sorted
      renders.push(() => {
        renderPrimary((data) => {
          if (j >= 0) {
            data[j].status = SORTED;
          }
          data[j + 1].status = SORTED;
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

export default insertionSort;
