function checkSpam(str) {
  const regExp = /1xBet|XXX/gi;

  return regExp.test(str);
}
