const createRender = (updateData) => {
  const render = async (change) => {
    updateData((prevData) => {
      const data = JSON.parse(
        JSON.stringify(prevData)
      );

      change(data);

      return data;
    });
  };

  return render;
};

export default createRender;
