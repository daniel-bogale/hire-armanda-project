export const dateFormatter = (date: Date) => {
  try {
    return date.toISOString();
  } catch (error) {
    console.log(error, "error");
    return new Date().toISOString();
  }
};
