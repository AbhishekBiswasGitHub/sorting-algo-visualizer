import STATUS from "../data/status";

const {
  UNSORTED,
  SORTED,
  ACTIVE,
  LESS,
  GREATER,
} = STATUS;

const combSort = (primary, renderPrimary) => {
  const renders = [];

  const getGap = (gap) =>
    Math.max(1, Math.floor(gap / 1.3));

  const numbers = primary.map(
    ({ value }) => value
  );
  const n = numbers.length;

  let gap = n;
  let swapped = true;

  while (swapped || gap > 2) {
    gap = getGap(gap);
    swapped = false;

    for (let i = 0; i < n - gap; i++) {
      if (numbers[i] > numbers[i + gap]) {
        [numbers[i], numbers[i + gap]] = [
          numbers[i + gap],
          numbers[i],
        ];
        swapped = true;

        const localGap = gap;

        // set current element as greater
        // set next element as less
        renders.push(() => {
          renderPrimary((data) => {
            data[i].status = GREATER;
            data[i + localGap].status = LESS;
          });
        });

        // swap current element with next element
        renders.push(() => {
          renderPrimary((data) => {
            [
              data[i].value,
              data[i + localGap].value,
            ] = [
              data[i + localGap].value,
              data[i].value,
            ];
            data[i].status = LESS;
            data[i + localGap].status = GREATER;
          });
        });

        // set current element as unsorted
        // set next element as unsorted
        renders.push(() => {
          renderPrimary((data) => {
            data[i].status = UNSORTED;
            data[i + localGap].status = UNSORTED;
          });
        });
      } else {
        const localGap = gap;

        // set current element as less
        // set next element as greater
        renders.push(() => {
          renderPrimary((data) => {
            data[i].status = LESS;
            data[i + localGap].status =
              data[i].value ===
              data[i + localGap].value
                ? LESS
                : GREATER;
          });
        });

        // set current element as unsorted
        // set next element as unsorted
        renders.push(() => {
          renderPrimary((data) => {
            data[i].status = UNSORTED;
            data[i + localGap].status = UNSORTED;
          });
        });
      }
    }
  }

  // set all elements as sorted
  renders.push(() => {
    renderPrimary((data) => {
      for (let i = 0; i < n; i++) {
        data[i].status = SORTED;
      }
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

export default combSort;
