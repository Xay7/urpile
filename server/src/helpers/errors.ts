// Custom error handler for multiple await functions in single try catch block
export const error = (code: number, message: string) => {
  return (e: any) => {
    console.log(e);
    e.status = code;
    e.details = message;
    throw e;
  };
};
