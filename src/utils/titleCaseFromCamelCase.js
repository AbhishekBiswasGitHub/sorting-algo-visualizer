const titleCaseFromCamelCase = (input) => {
  const words = input.split(/(?=[A-Z])/);

  const result = words
    .map((word) => {
      return (
        word.charAt(0).toUpperCase() +
        word.slice(1)
      );
    })
    .join(" ");

  return result;
};

export default titleCaseFromCamelCase;
