import STATUS from "../data/status";

const {
  UNSORTED,
  SORTED,
  ACTIVE,
  LESS,
  GREATER,
} = STATUS;

const shellSort = (primary, renderPrimary) => {
  const getGap = (num) => Math.floor(num / 2);
  const renders = [];
  const numbers = primary.map(
    ({ value }) => value
  );
  const n = numbers.length;
  let gap = getGap(n);

  while (gap > 0) {
    const currentGap = gap;

    for (let i = currentGap; i < n; i++) {
      const localGap = currentGap;
      const currentSorted = [];

      const current = numbers[i];
      let j = i - localGap;

      // select current element to be sorted
      renders.push(() => {
        renderPrimary((data) => {
          data[i].status = ACTIVE;
        });
      });

      if (numbers[j] <= current) {
        let tempJ = j - gap;
        const tempSorted = [];
        while (tempJ >= 0) {
          tempSorted.push(tempJ);
          tempJ -= gap;
        }

        // set current element as less
        // set all elements before current element as sorted
        renders.push(() => {
          renderPrimary((data) => {
            const localTempSorted = [
              ...tempSorted,
            ];

            data[j].status = LESS;

            for (
              let i = 0;
              i < localTempSorted.length;
              i++
            ) {
              data[localTempSorted[i]].status =
                SORTED;
            }
          });
        });

        // set current element to be sorted and current element as sorted
        renders.push(() => {
          renderPrimary((data) => {
            data[i].status = SORTED;
            data[j].status = SORTED;
          });
        });

        currentSorted.push(i, j, ...tempSorted);
      }

      while (j >= 0 && numbers[j] > current) {
        const currentJ = j;

        // set current element as greater
        renders.push(() => {
          renderPrimary((data) => {
            data[currentJ].status = GREATER;
          });
        });

        numbers[j + gap] = numbers[j];

        // shift current element to right
        renders.push(() => {
          renderPrimary((data) => {
            data[currentJ + localGap].value =
              data[currentJ].value;
            data[currentJ + localGap].status =
              SORTED;
            data[currentJ].value = 0;
            data[currentJ].status = UNSORTED;
          });
        });

        currentSorted.push(currentJ + localGap);

        j -= gap;

        if (j >= 0 && numbers[j] <= current) {
          let tempJ = j - gap;
          const tempSorted = [];
          while (tempJ >= 0) {
            tempSorted.push(tempJ);
            tempJ -= gap;
          }

          // set current element as less
          // set all elements before current element as sorted
          renders.push(() => {
            renderPrimary((data) => {
              const localTempSorted = [
                ...tempSorted,
              ];

              data[currentJ - localGap].status =
                LESS;

              for (
                let i = 0;
                i < localTempSorted.length;
                i++
              ) {
                data[localTempSorted[i]].status =
                  SORTED;
              }
            });
          });

          currentSorted.push(
            currentJ - localGap,
            ...tempSorted
          );
        }
      }

      if (j + gap !== i) {
        numbers[j + gap] = current;

        // insert current element to be sorted right next to the current element
        renders.push(() => {
          renderPrimary((data) => {
            data[j + localGap].value = current;
            data[j + localGap].status = ACTIVE;
          });
        });

        currentSorted.push(j + localGap);

        // set current element to be sorted and current element as sorted
        renders.push(() => {
          renderPrimary((data) => {
            if (j >= 0) {
              data[j].status = SORTED;
            }
            data[j + localGap].status = SORTED;
          });
        });

        if (j >= 0) {
          currentSorted.push(j);
        }
      }

      if (gap !== 1) {
        // set all sorted elements as unsorted
        renders.push(() => {
          renderPrimary((data) => {
            const localCurrentSorted = [
              ...currentSorted,
            ];

            for (
              let i = 0;
              i < localCurrentSorted.length;
              i++
            ) {
              data[localCurrentSorted[i]].status =
                UNSORTED;
            }
          });
        });
      }
    }

    gap = getGap(gap);
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

export default shellSort;
