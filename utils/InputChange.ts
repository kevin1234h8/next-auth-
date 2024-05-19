export const handleInpuChange = (e: any, setValues: any) => {
  const { name, value } = e.target;
  setValues((prevValues: any) => ({
    ...prevValues,
    [name]: value,
  }));
};
