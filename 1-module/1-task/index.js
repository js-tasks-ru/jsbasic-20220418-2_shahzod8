function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }

  let result = 1;

  for (let index = n; index > 0; index -= 1) {
    result *= index;
  }

  return result;
}
