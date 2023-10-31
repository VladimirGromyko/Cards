const checkEmail = (email: string) => {
  let indexA: number | undefined = email?.indexOf("@");
  let indexPoint: number | undefined = email?.indexOf(".");
  let value = false;
  if (
    indexA > 0 &&
    indexPoint > 1 &&
    email.length > 5 &&
    indexPoint < email.length - 2
  ) {
    value = true;
  }
  return value;
};
export default checkEmail;
