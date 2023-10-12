import STATUS from "../data/status";

const {
  UNSORTED,
  SORTED,
  ACTIVE,
  LESS,
  GREATER,
} = STATUS;

const countingSort = (
  primary,
  renderPrimary,
  renderAuxiliary
) => {
  const renders = [];
  const unsorted = primary.map(
    ({ value }) => value
  );
  const n = unsorted.length;

  if (n > 0) {
    const min = Math.min(...unsorted);
    const max = Math.max(...unsorted);

    const counts = new Array(max - min + 1).fill(
      0
    );

    for (let i = 0; i < unsorted.length; i++) {
      const index = unsorted[i] - min;
      counts[index]++;

      // select current element in primary array
      // select current element value count in auxiliary array
      renders.push(() => {
        renderPrimary((data) => {
          data[i].status = ACTIVE;
        });
        renderAuxiliary((data) => {
          data[index].status = ACTIVE;
        });
      });

      // remove current element in primary array
      // increment current element value count in auxiliary array
      renders.push(() => {
        renderPrimary((data) => {
          data[i].value = 0;
          data[i].status = UNSORTED;
        });
        renderAuxiliary((data) => {
          data[index].value++;
          data[index].status = GREATER;
        });
      });

      // deselect current element value count in auxiliary array
      renders.push(() => {
        renderAuxiliary((data) => {
          data[index].status = UNSORTED;
        });
      });
    }

    let index = 0;

    for (let i = 0; i < counts.length; i++) {
      const number = i + min;
      let count = counts[i];

      // select current value count in auxiliary array
      renders.push(() => {
        renderAuxiliary((data) => {
          data[i].status = ACTIVE;
        });
      });

      while (count > 0) {
        const localIndex = index;

        // insert current value in primary array
        // decrease current value count in auxiliary array
        renders.push(() => {
          renderPrimary((data) => {
            data[localIndex].value = number;
            data[localIndex].status = SORTED;
          });
          renderAuxiliary((data) => {
            data[i].value--;
            data[i].status = LESS;
          });
        });

        index++;
        count--;
      }
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

export default countingSort;
