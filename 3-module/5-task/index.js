const getArrayOfNumbers = (str) => str
  .split(' ')
  .map((element) => Number(element))
  .filter((num) => isFinite(num));

function getMinMax(str) {
  const arrayNumbers = getArrayOfNumbers(str);
  const min = Math.min(...arrayNumbers);
  const max = Math.max(...arrayNumbers);

  return { min, max };
}
