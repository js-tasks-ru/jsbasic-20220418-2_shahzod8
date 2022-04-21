function sumSalary(salaries) {
  return Object.keys(salaries).reduce((result, key) => {
    if (isFinite(salaries[key])) {
      result += salaries[key];
    }
    return result;
  }, 0);
}
